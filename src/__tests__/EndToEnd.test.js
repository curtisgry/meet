import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
    // });
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.event');

    const eventDetails = await page.$('.event__Details .visible');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event');
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event__Details .visible');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event__Details .visible');
    expect(eventDetails).toBeNull();
  });

  test('Typing in the suggestion box will suggest locations', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.suggestions');

    await page.click('.city');
    await page.type('.city', 'Berlin');
    const eventList = await page.$$eval(
      '.suggestions li',
      (items) => items.length
    );
    expect(eventList).toEqual(2);
  });

  test('Clicking on a city will update the list of events to events in that city', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.suggestions');

    await page.click('.city');
    await page.type('.city', 'Berlin');
    const suggestions = await page.$$('.suggestions li');
    await suggestions[0].click();
    const eventsLocationInfo = (await page.$$('.event')).length;

    expect(eventsLocationInfo).toEqual(3);
  });
});
