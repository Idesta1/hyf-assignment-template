const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const resultInput = document.getElementById("resultInput");

resultInput.readOnly = true;

//create currency code options and populate the select elements dynamically
function currencyOptions(currencyCodes) {
  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";

  currencyCodes.forEach((code) => {
    const fromOption = document.createElement("option");
    fromOption.value = code;
    fromOption.textContent = code;
    fromCurrency.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = code;
    toOption.textContent = code;
    toCurrency.appendChild(toOption);
  });
  // Set default selections
  fromCurrency.value = "EUR";
  toCurrency.value = "DKK";
}

// Fetch the list of currency codes from the API and populate the select elements
async function currencyList() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    const currencyCodes = Object.keys(data.rates).sort();

    currencyOptions(currencyCodes);
  } catch (error) {
    console.error("Error loading currency list:", error);
  }
}

// The primary function to convert the currency based on user input and display the result
async function convertCurrency() {
  try {
    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!Number.isFinite(amount) || amount <= 0) {
      resultInput.value = "Please enter a valid amount.";
      return;
    }

    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();
    const rates = data.rates[to];

    const convertedAmount = (amount * rates).toFixed(2);
    resultInput.value = convertedAmount;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    resultInput.value =
      "Error fetching exchange rates. Please try again later.";
  }
}

convertButton.addEventListener("click", convertCurrency);
currencyList();
