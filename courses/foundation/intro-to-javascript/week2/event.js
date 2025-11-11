function getEventWeekday(daysToAdd = 5) {
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
  const WeekDay = date.getDay(); // 0-6 (0 = Sunday)

  // Use remainder operator (%) to wrap around the array
  const EventDay = (WeekDay + daysToAdd) % weekDays.length;

  return weekDays[EventDay];
}

console.log(getEventWeekday(6));
console.log(getEventWeekday(3));

// declared variable in array weekDays Sunday - Saturday,
// use new date() to access current date and getDay() to get current weekday 0-6,
