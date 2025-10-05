import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProductsById, useProductStore } from "./productStore";

export type CartItems = Record<string, number>;

type State = {
  cartItems: CartItems;
  isProcessingPayment: boolean;
};

type Actions = {
  /** Add same product one by one */
  addOne: (productId: string) => void;

  /** Remove one product */
  removeOne: (productId: string) => void;

  /** Set quantity explicitly */
  addItemByQty: (productId: string, qty: number) => void;

  /** Remove product from cart */
  removeItem: (productId: string) => void;

  /** Clear cart */
  clear: () => void;

  /** Checkout: call `/pay` and if successful, clear the cart (stock deduction is done on the server side) */
  checkout: (
    seatCode: string[],
  ) => Promise<{ ok: boolean; paymentId?: string }>;
};

export type CartStore = State & Actions;

const initial: State = {
  cartItems: {},
  isProcessingPayment: false,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initial,

      addOne: (productId) =>
        set((state) => ({
          cartItems: {
            ...state.cartItems,
            [productId]: (state.cartItems[productId] ?? 0) + 1,
          },
        })),

      removeOne: (productId) =>
        set((state) => {
          const current = state.cartItems[productId] ?? 0;
          if (current <= 1) {
            const { [productId]: _, ...rest } = state.cartItems;
            return { cartItems: rest };
            // get().removeItem(productId);
          }
          return {
            cartItems: { ...state.cartItems, [productId]: current - 1 },
          };
        }),

      addItemByQty: (productId, qty) =>
        set((state) => {
          if (qty <= 0) {
            const { [productId]: _, ...rest } = state.cartItems;
            return { cartItems: rest };
            // get().removeItem(productId);
          }
          return {
            cartItems: { ...state.cartItems, [productId]: Math.floor(qty) },
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const { [productId]: _, ...rest } = state.cartItems;
          return { cartItems: rest };
        }),

      clear: () => set({ cartItems: {} }),

      checkout: async (seatCode) => {
        const { cartItems } = get();
        const items = Object.entries(cartItems).map(([id, qty]) => ({
          id,
          qty,
        }));

        if (items.length === 0) return { ok: true, paymentId: undefined };

        set({ isProcessingPayment: true });
        try {
          const res = await fetch(
            "https://my-json-server.typicode.com/kanoflor/immfly-assignment/products",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ seatCode: seatCode.join(""), ...items }),
            },
          );
          const data = await res.json().catch(() => ({}));

          if (!res.ok) throw new Error("payment_failed");

          // Reduce stock for purchased items after successful payment
          useProductStore.getState().reduceStock(items);

          set({ cartItems: {}, isProcessingPayment: false });
          return {
            statusCode: 200,
            ok: true,
            paymentId: String(data?.paymentId ?? ""),
          };
        } catch {
          return { statusCode: 200, ok: false };
        } finally {
          set({ isProcessingPayment: false });
        }
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
    },
  ),
);

/* ------------------- selectors ------------------- */

/** Total quantity of items */
export const selectTotalQty = (s: State) =>
  Object.values(s.cartItems).reduce((a, b) => a + b, 0);

/** Subtotal (EUR, sum of priceEUR * quantity) */
export const createSelectSubtotalEUR =
  (byId: ProductsById) =>
  (s: State): number =>
    Object.entries(s.cartItems).reduce((sum, [id, qty]) => {
      const p = byId[id];
      return p ? sum + (p.priceEUR ?? 0) * qty : sum;
    }, 0);

/** For currency display (example: inject exchange rate from outside) */
export const createSelectSubtotalInCurrency =
  (byId: ProductsById, rate: number) =>
  (s: State): number => {
    const base = createSelectSubtotalEUR(byId)(s);
    return Math.round(base * rate * 100) / 100;
  };
