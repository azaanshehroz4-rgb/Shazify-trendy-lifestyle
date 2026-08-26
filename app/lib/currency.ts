export type Currency = "USD" | "PKR";

export function getUserCurrency(): Currency {
  if (typeof window === "undefined") {
    return "USD";
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timeZone === "Asia/Karachi") {
    return "PKR";
  }

  return "USD";
}

export function convertPrice(
  priceUSD: number,
  currency: Currency
): number {
  if (currency === "PKR") {
    const exchangeRate = 280;

    return priceUSD * exchangeRate;
  }

  return priceUSD;
}

export function formatPrice(
  priceUSD: number,
  currency?: Currency
): string {
  const selectedCurrency = currency || getUserCurrency();

  const convertedPrice = convertPrice(
    priceUSD,
    selectedCurrency
  );

  if (selectedCurrency === "PKR") {
    return `Rs. ${Math.round(convertedPrice).toLocaleString("en-PK")}`;
  }

  return `$${convertedPrice.toFixed(2)}`;
}