import { create } from 'zustand';

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
  isFetching: boolean;
};

type Actions = {
  /** Set products and byId */
  setProducts: (products: Product[]) => void;

  /** Fetch products and set products and byId */
  fetchProducts: () => void;

  /** Reduce stock for purchased items and remove products with 0 stock */
  reduceStock: (items: { id: string; qty: number }[]) => void;
};

export type ProductStore = State & Actions;

const initial: State = {
  products: [],
  byId: {},
  lastFetchedAt: 0,
  isFetching: false,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initial,
  setProducts: products => {
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
    set({ isFetching: true });
    try {
      // Set 5 minutes cache
      const ttl = 5 * 60 * 1000;

      if (Date.now() - (get().lastFetchedAt ?? 0) < ttl) return;

      const res = await fetch(
        'https://my-json-server.typicode.com/kanoflor/immfly-assignment/products'
      );
      const data: Product[] = await res.json();
      get().setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },
  reduceStock: items => {
    const { products } = get();
    const updatedProducts: Product[] = [];
    const updatedById: Record<string, Product | undefined> = {};

    // Create a map of item quantities for quick lookup
    const itemQtyMap = items.reduce(
      (acc, item) => {
        acc[item.id] = item.qty;
        return acc;
      },
      {} as Record<string, number>
    );

    // Process each product
    products.forEach(product => {
      const purchasedQty = itemQtyMap[product.id] || 0;
      const newStock = product.stock - purchasedQty;

      // Only keep products with stock > 0
      if (newStock > 0) {
        const updatedProduct = { ...product, stock: newStock };
        updatedProducts.push(updatedProduct);
        updatedById[product.id] = updatedProduct;
      }
      // Products with stock <= 0 are removed (not added to arrays)
    });

    set({ products: updatedProducts, byId: updatedById });
  },
}));
