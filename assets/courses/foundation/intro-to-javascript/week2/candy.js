const boughtCandyPrices = [];

function addCandy(candyType, weight) {
  let pricePerGram;
  if (candyType === "sweet") {
    pricePerGram = 0.5;
  } else if (candyType === "chocolate") {
    pricePerGram = 0.7;
  } else if (candyType === "toffee") {
    pricePerGram = 1.1;
  } else if (candyType === "chewing-gum") {
    pricePerGram = 0.03;
  } else {
    console.log("Unknown candy type");
    return;
  }

  const totalPrice = pricePerGram * weight;
  boughtCandyPrices.push(candyType, totalPrice.toFixed());
  return boughtCandyPrices;
}

const amountToSpend = Math.random() * 100;
console.log(`You have ${amountToSpend.toFixed(2)} kroner to spend on candy.`);

console.log(canBuyMoreCandy());

console.log(addCandy("sweet", 20));
console.log(addCandy("chocolate", 15));
console.log(addCandy("toffee", 10));
console.log(addCandy("chewing-gum", 5));
