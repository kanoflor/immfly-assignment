import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Currency } from "../utils/currency";

type CurrencyStore = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: "EUR",
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "currency-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ currency: state.currency }),
    }
  )
);
