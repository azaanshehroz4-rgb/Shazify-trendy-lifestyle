export type Currency = "USD" | "PKR";

// --------------------------------
// Get user's currency
// --------------------------------

export function getUserCurrency(): Currency {
  if (typeof window === "undefined") {
    return "PKR";
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timeZone === "Asia/Karachi") {
    return "PKR";
  }

  return "USD";
}

// --------------------------------
// Convert PKR → selected currency
// --------------------------------

export function convertPrice(
  pricePKR: number,
  currency: Currency
): number {
  if (currency === "USD") {
    const exchangeRate = 280;

    return pricePKR / exchangeRate;
  }

  return pricePKR;
}

// --------------------------------
// Format Price
// --------------------------------

export function formatPrice(
  pricePKR: number,
  currency?: Currency
): string {
  const selectedCurrency = currency || getUserCurrency();

  const convertedPrice = convertPrice(
    pricePKR,
    selectedCurrency
  );

  if (selectedCurrency === "PKR") {
    return `Rs. ${Math.round(convertedPrice).toLocaleString("en-PK")}`;
  }

  return `$${convertedPrice.toFixed(2)}`;
}