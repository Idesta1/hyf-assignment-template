const convertedAmountElement = document.getElementById("convertedAmount");
convertedAmountElement.addEventListener("click", convertCurrency);
result.textContent = `${convertedAmount}`;

async function convertCurrency() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    console.log(data);
    const rate = data.rates.EUR;
    const convertedAmount = amount * rate;
    console.log();
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}
convertCurrency();
