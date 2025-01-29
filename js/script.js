/****************************************************
 * 1. Currency Converter for Finance Forge
 ****************************************************/
// For demonstration, static exchange rates are used here.
// In production, rates should be fetched from real-time APIs.

const exchangeRates = {
  USD: 1.00,    // Base currency
  GBP: 0.80,
  EUR: 0.90,
  JPY: 170.00,
  BRL: 0.19,
  NPR: 138.02
};

// Mapping of currency codes to flag image URLs
const currencyFlags = {
  USD: 'https://flagcdn.com/w20/us.png',
  GBP: 'https://flagcdn.com/w20/gb.png',
  EUR: 'https://flagcdn.com/w20/eu.png',
  JPY: 'https://flagcdn.com/w20/jp.png',
  BRL: 'https://flagcdn.com/w20/br.png',
  NPR: 'https://flagcdn.com/w20/np.png'
};

// Get DOM elements for currency converter
const currencyConverterForm = document.getElementById("currency-converter-form");
const currencyAmountInput = document.getElementById("currencyAmount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const currencyResultDiv = document.getElementById("currencyResult");
const fromFlagImg = document.getElementById("fromFlag");
const toFlagImg = document.getElementById("toFlag");
const resultFlagImg = document.getElementById("resultFlag");
const convertedAmountSpan = document.getElementById("convertedAmount");

/**
 * Function to update flag images based on selected currency.
 * @param {HTMLElement} selectElement - The select dropdown element.
 * @param {HTMLElement} flagImgElement - The image element to display the flag.
 */
function updateFlag(selectElement, flagImgElement) {
  const selectedCurrency = selectElement.value;
  const flagSrc = currencyFlags[selectedCurrency];
  if (flagSrc) {
    flagImgElement.src = flagSrc;
    flagImgElement.alt = selectedCurrency;
  } else {
    flagImgElement.src = '';
    flagImgElement.alt = '';
  }
}

// Initialize flags on page load
updateFlag(fromCurrencySelect, fromFlagImg);
updateFlag(toCurrencySelect, toFlagImg);

// Event listeners for currency selection changes to update flags
fromCurrencySelect.addEventListener("change", () => {
  updateFlag(fromCurrencySelect, fromFlagImg);
});

toCurrencySelect.addEventListener("change", () => {
  updateFlag(toCurrencySelect, toFlagImg);
});

// Handle form submission for currency conversion
currencyConverterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(currencyAmountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  // Input validation
  if (isNaN(amount) || amount <= 0) {
    currencyResultDiv.style.display = "block";
    currencyResultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  // Conversion logic: Convert from 'fromCurrency' to USD, then USD to 'toCurrency'
  const amountInUSD = amount / exchangeRates[fromCurrency];
  const convertedAmount = amountInUSD * exchangeRates[toCurrency];

  // Update the result display with the target currency's flag and converted amount
  convertedAmountSpan.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
  
  if (currencyFlags[toCurrency]) {
    resultFlagImg.src = currencyFlags[toCurrency];
    resultFlagImg.alt = toCurrency;
  } else {
    resultFlagImg.src = '';
    resultFlagImg.alt = '';
  }

  currencyResultDiv.style.display = "block";
});

/****************************************************
 * 2. Investment Calculator (Compound Interest)
 ****************************************************/
const annualInterestRate = 0.08; // 8% annual interest example

// Get DOM elements for investment calculator
const investmentForm = document.getElementById("investment-form");
const principalAmountInput = document.getElementById("principalAmount");
const timeInYearsInput = document.getElementById("timeInYears");
const investmentResultDiv = document.getElementById("investmentResult");

/**
 * Function to calculate compound interest.
 * @param {number} principal - The initial amount of money.
 * @param {number} rate - The annual interest rate (decimal).
 * @param {number} time - The time the money is invested for (in years).
 * @returns {number} - The amount of money accumulated after n years, including interest.
 */
function calculateCompoundInterest(principal, rate, time) {
  return principal * Math.pow((1 + rate), time);
}

// Handle form submission for investment calculator
investmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const principal = parseFloat(principalAmountInput.value);
  const years = parseInt(timeInYearsInput.value, 10);

  // Input validation
  if (isNaN(principal) || principal <= 0 || isNaN(years) || years <= 0) {
    investmentResultDiv.style.display = "block";
    investmentResultDiv.textContent = "Please enter valid numeric values.";
    return;
  }

  // Calculate compound interest
  const amount = calculateCompoundInterest(principal, annualInterestRate, years);

  // Update the result display
  investmentResultDiv.style.display = "block";
  investmentResultDiv.innerHTML = 
    `<strong>Estimated Value After ${years} Years:</strong> £${amount.toFixed(2)}`;
});
