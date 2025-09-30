import { create } from "zustand";
import { Product } from "./productStore";

type CartStore = {
  cartItems: Product[];
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
  clearCart: () => void;
  // reduceStock: (product: Product, quantity: number) => void;
};

export const useProductStore = create<CartStore>((set, _get, store) => ({
  cartItems: [],
  addItemToCart: (product) => {
    set((state) => ({ cartItems: [...state.cartItems, product] }));
  },
  removeItemFromCart: (product) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== product.id),
    }));
  },
  clearCart: () => {
    set(store.getInitialState());
  },
  // reduceStock: (product, quantity) => {
  //   // TODO: API操作？
  //   set((state) => ({
  //     cartItems: state.cartItems.map((item) =>
  //       item.id === product.id
  //         ? { ...item, stock: item.stock - quantity }
  //         : item
  //     ),
  //   }));
  // },
}));
