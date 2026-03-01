function getEventWeekday(daysToAdd) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  const WeekDay = date.getDay();
  const EventDay = (WeekDay + daysToAdd) % weekDays.length;

  return weekDays[EventDay];
}

console.log(getEventWeekday(7));
console.log(getEventWeekday(1));

//function getEventWeekday with daysToAdd parameter,
// declared variable in array weekDays Sunday - Saturday,
// use new date() to access current date and getDay() to get current weekday 0-6,
