let favoritePizza = "margarita";
let margaritaPrice = 100;
let pizzaCount = 5;
let takeAway = false;

const totalPrice = margaritaPrice * pizzaCount;

if (takeAway) {
  console.log(
    "New pizza order: TakeAway" +
      " " +
      pizzaCount +
      " " +
      favoritePizza +
      "." +
      " Total cost for your order is " +
      totalPrice +
      " Kroner."
  );
} else {
  console.log(
    "New pizza order: In store" +
      " " +
      pizzaCount +
      " " +
      favoritePizza +
      "." +
      "Total cost for your pizza is " +
      totalPrice +
      " Kroner."
  );
}
