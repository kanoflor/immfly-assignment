import { create } from "zustand";

export type Product = {
  id: string;
  name: string;
  priceEUR: number;
  stock: number;
  image: string;
};

type ProductStore = {
  products: Product[];
  fetchProducts: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: () => {
    fetch(
      "https://my-json-server.typicode.com/kanoflor/immfly-assignment/products"
    )
      .then((response) => response.json())
      .then((data) => set({ products: data }));
  },
}));
