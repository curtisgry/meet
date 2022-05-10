import axios from 'axios';
import NProgress from 'nprogress';
import { mockData } from './mock-data';

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState('', '', newUrl);
  } else {
    const newUrl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState('', '', newUrl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://dau1cz6z6a.execute-api.eu-central-1.amazonaws.com/dev/api/token` +
      `/${encodeCode}`
  )
    .then((res) => res.json())
    .catch((error) => error);

  /* eslint-disable */
  access_token && localStorage.setItem('access_token', access_token);
  /* eslint-disable */
  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(
        'https://dau1cz6z6a.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

export const getEvents = async () => {
  NProgress.start();
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://dau1cz6z6a.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);
    if (result.data) {
      const locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};
