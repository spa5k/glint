// ["SUN","MON","TUES","WEDS","THURS","FRI","SAT"]
// Use the above array to return day of the week as a string
export const dayToDayString = (day: number): string => {
  const days = ["SUN", "MON", "TUES", "WEDS", "THURS", "FRI", "SAT"];
  return days[day];
};

// reverse of the function above
export const dayToDayNumber = (day: string): number => {
  const days = ["SUN", "MON", "TUES", "WEDS", "THURS", "FRI", "SAT"];
  return days.indexOf(day);
};
