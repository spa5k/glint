// Mon, Fri, Sun, Thurs, Weds, Tues
// If these letters are present in input, remove them from the string, then return the string, and the removed wordds in array
export const extractDay = () => {
  const days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  const collectedDays: string[] = [];

  const randomDay = days[Math.floor(Math.random() * days.length)];
  collectedDays.push(randomDay.toUpperCase());

  let randomOpeningHour = `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}`;

  let hoursOpen = randomOpeningHour.split(":")[0];
  let minutesOpen = randomOpeningHour.split(":")[1];
  if (hoursOpen.length === 1) {
    hoursOpen = `0${hoursOpen}`;
  }
  if (minutesOpen.length < 2) {
    minutesOpen = `0${minutesOpen}`;
  }

  // Join back
  randomOpeningHour = `${hoursOpen}:${minutesOpen}am`;

  // Random closing hour, will always be after random opening hour
  let randomClosingHour = `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}`;

  let hoursClose = randomClosingHour.split(":")[0];
  let minutesClose = randomClosingHour.split(":")[1];

  if (hoursClose.length < 2) {
    hoursClose = `0${hoursClose}`;
  }
  if (minutesClose.length < 2) {
    minutesClose = `0${minutesClose}`;
  }

  // Join back
  randomClosingHour = `${hoursClose}:${minutesClose}pm`;

  return {
    openingHour: randomOpeningHour,
    closingHour: randomClosingHour,
    days: randomDay.toUpperCase(),
  };
};
