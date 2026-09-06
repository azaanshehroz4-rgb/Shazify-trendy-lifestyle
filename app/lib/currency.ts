export type Currency = "USD" | "PKR" | "EUR" | "GBP";

// --------------------------------
// Get user's currency
// --------------------------------

export function getUserCurrency(): Currency {
  if (typeof window === "undefined") {
    return "PKR";
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Pakistan
  if (timeZone === "Asia/Karachi") {
    return "PKR";
  }

  // Europe
  if (
    timeZone.startsWith("Europe/") &&
    ![
      "Europe/London",
      "Europe/Dublin",
      "Europe/Guernsey",
      "Europe/Isle_of_Man",
      "Europe/Jersey",
    ].includes(timeZone)
  ) {
    return "EUR";
  }

  // United Kingdom
  if (
    [
      "Europe/London",
      "Europe/Dublin",
      "Europe/Guernsey",
      "Europe/Isle_of_Man",
      "Europe/Jersey",
    ].includes(timeZone)
  ) {
    return "GBP";
  }

  // Default international currency
  return "USD";
}

// --------------------------------
// Convert PKR → selected currency
// --------------------------------

export function convertPrice(
  pricePKR: number,
  currency: Currency
): number {
  // These are initial display rates.
  // We can connect a live exchange-rate API later.

  const exchangeRates: Record<Currency, number> = {
    PKR: 1,
    USD: 1 / 280,
    EUR: 1 / 325,
    GBP: 1 / 375,
  };

  return pricePKR * exchangeRates[currency];
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

  switch (selectedCurrency) {
    case "PKR":
      return `Rs. ${Math.round(convertedPrice).toLocaleString(
        "en-PK"
      )}`;

    case "EUR":
      return `€${convertedPrice.toFixed(2)}`;

    case "GBP":
      return `£${convertedPrice.toFixed(2)}`;

    case "USD":
    default:
      return `$${convertedPrice.toFixed(2)}`;
  }
}