export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const extractEvents = (data) => {
  const extractedEvents = data.map((item) => ({
    summary: item.summary,
    description: item.description,
    date: item.start.dateTime,
    timezone: item.start.timeZone,
    htmlLink: item.htmlLink,
  }));
  const events = [...new Set(extractedEvents)];
  return events;
};
