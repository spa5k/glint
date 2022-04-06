// Mon, Fri, Sun, Thurs, Weds, Tues
// If these letters are present in input, remove them from the string, then return the string, and the removed wordds in array
export const extractDay = () => {
  const days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  const collectedDays: string[] = [];

  // Generate random day
  const randomDay = days[Math.floor(Math.random() * days.length)];
  collectedDays.push(randomDay.toUpperCase());

  // Generate random opening_hours
  // Sample 11:00am, 1:15pm, 10:00am
  let randomOpeningHour = `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}`;

  // split randomOpeningHour into hours and minutes
  // if hours is single digit, add a 0 in front
  // if minutes is single digit, add a 0 in back
  let hours = randomOpeningHour.split(":")[0];
  let minutes = randomOpeningHour.split(":")[1];
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }

  // Join back
  randomOpeningHour = `${hours}:${minutes}am`;

  // Random closing hour, will always be after random opening hour
  let randomClosingHour = `${Math.floor(Math.random() * 12)}:${Math.floor(
    Math.random() * 60
  )}`;

  while (
    parseInt(randomClosingHour.split(":")[0]) <=
    parseInt(randomOpeningHour.split(":")[0])
  ) {
    randomClosingHour = `${Math.floor(Math.random() * 12)}:${Math.floor(
      Math.random() * 60
    )}`;
  }

  // split randomOpeningHour into hours and minutes
  // if hours is single digit, add a 0 in front
  // if minutes is single digit, add a 0 in back
  let hoursC = randomClosingHour.split(":")[0];
  let minutesC = randomClosingHour.split(":")[1];

  if (hoursC.length < 2) {
    hoursC = `0${hoursC}`;
  }
  if (minutesC.length < 2) {
    minutesC = `0${minutesC}`;
  }

  // Join back
  randomClosingHour = `${hoursC}:${minutesC}pm`;

  return {
    openingHour: randomOpeningHour,
    closingHour: randomClosingHour,
    days: randomDay.toUpperCase(),
  };
};
