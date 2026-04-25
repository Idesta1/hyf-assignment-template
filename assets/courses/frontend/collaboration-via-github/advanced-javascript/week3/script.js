const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("convert");
const swapCurrenciesButton = document.getElementById("swapCurrencies");
const resultInput = document.getElementById("resultInput");

resultInput.readOnly = true;

/**Fetch exchange rate data for a given base currency */
async function fetchRateData(baseCurrency) {
  const response = await fetch(
    `https://open.er-api.com/v6/latest/${baseCurrency}`,
  );
  return response.json();
}

/**create currency code options and populate the select elements dynamically*/
function getCurrencyCodes(currencyCodes) {
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

/**Fetch the list of currency codes from the API and populate the select elements*/
async function showCurrencyList() {
  try {
    const data = await fetchRateData("EUR");

    const currencyCodes = Object.keys(data.rates).sort();

    getCurrencyCodes(currencyCodes);
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

    const data = await fetchRateData(from);
    const rates = data.rates[to];

    const convertedAmount = (amount * rates).toFixed(2);
    resultInput.value = convertedAmount;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    resultInput.value =
      "Error fetching exchange rates. Please try again later.";
  }
}

function swapCurrencies() {
  const currentFromCurrency = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = currentFromCurrency;
}

convertButton.addEventListener("click", convertCurrency);
swapCurrenciesButton.addEventListener("click", swapCurrencies);
showCurrencyList();
