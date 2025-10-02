import { create } from "zustand";

export type Product = {
  id: string;
  name: string;
  priceEUR: number;
  stock: number;
  image: string;
};

export type ProductsById = Record<string, Product | undefined>;

type State = {
  products: Product[];
  byId: Record<string, Product | undefined>;
  lastFetchedAt: number;
};

type Actions = {
  /** Set products and byId */
  setProducts: (products: Product[]) => void;

  /** Fetch products and set products and byId */
  fetchProducts: () => void;
};

export type ProductStore = State & Actions;

const initial: State = {
  products: [],
  byId: {},
  lastFetchedAt: 0,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initial,
  setProducts: (products) => {
    const byId: Record<string, Product> = {};
    const ids: string[] = [];
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      byId[p.id] = p;
      ids.push(p.id);
    }
    set({ byId, products, lastFetchedAt: Date.now() });
  },
  fetchProducts: async () => {
    // Set 5 minutes cache
    const ttl = 5 * 60 * 1000;

    if (Date.now() - (get().lastFetchedAt ?? 0) < ttl) return;

    const res = await fetch(
      "https://my-json-server.typicode.com/kanoflor/immfly-assignment/products"
    );
    const data: Product[] = await res.json();
    get().setProducts(data);
  },
}));
