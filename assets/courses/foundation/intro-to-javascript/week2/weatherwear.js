function whatToWear(temperature) {
  const winter = `Jacket , pants  and  sweater`;
  const summer = `t-shirt , shorts and summer-dress`; //using template literals

  if (temperature >= 17) {
    return `You can wear ${summer}`;
  } else if (temperature < 17) {
    return `You can wear ${winter}`;
  } else {
    return "You can always decide what to wear";
  }
}

console.log(whatToWear(20));
console.log(whatToWear(10));
console.log(whatToWear());

//added temperature parameter and used if else condition to return whatToWear,
//used template literal to concatenating strings
