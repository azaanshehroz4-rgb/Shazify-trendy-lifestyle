"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getUserCurrency,
  type Currency,
} from "../lib/currency";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext =
  createContext<CurrencyContextType | undefined>(
    undefined
  );

export function CurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currency, setCurrencyState] =
    useState<Currency>("PKR");

  useEffect(() => {
    setCurrencyState(getUserCurrency());

    const handleCurrencyChange = (event: Event) => {
      const customEvent = event as CustomEvent<Currency>;
      setCurrencyState(customEvent.detail);
    };

    window.addEventListener(
      "shazify-currency-change",
      handleCurrencyChange
    );

    return () => {
      window.removeEventListener(
        "shazify-currency-change",
        handleCurrencyChange
      );
    };
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    localStorage.setItem(
      "shazify_currency",
      newCurrency
    );

    setCurrencyState(newCurrency);

    window.dispatchEvent(
      new CustomEvent("shazify-currency-change", {
        detail: newCurrency,
      })
    );
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrency must be used inside CurrencyProvider"
    );
  }

  return context;
}