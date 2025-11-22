const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const form = document.getElementById("converter-form");
const result = document.getElementById("exchange-result");
const amountInput = document.getElementById("amount");
const swapBtn = document.querySelector(".swap-btn");

Object.keys(countryList).forEach((code) => {
  const option1 = new Option(code, code);
  const option2 = new Option(code, code);
  fromCurrency.add(option1);
  toCurrency.add(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// Update flag when select changes
function updateFlag(selectElement, flagImg) {
  const countryCode = countryList[selectElement.value];
  flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));

// Swap functionality
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
  getExchangeRate();
});

// Dummy function – Replace with real API call
async function getExchangeRate() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    // Replace this with a real API call
    // Example: https://api.exchangerate-api.com/v4/latest/${from}
    const exchangeRate = Math.random() * (90 - 70) + 70; // mock rate
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    result.textContent = "Error fetching exchange rate.";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", getExchangeRate);
