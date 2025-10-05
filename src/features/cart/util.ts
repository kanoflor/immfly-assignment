import { CartItems } from '../../store/cartStore';
import { Product, ProductsById } from '../../store/productStore';

export type FormattedCartItem = Product & {
  qty: number;
};

export const formatCartItems = (cartItems: CartItems, byId: ProductsById) => {
  return Object.entries(cartItems).map(([id, qty]) => {
    const product = byId[id];

    return {
      id,
      stock: product?.stock,
      name: product?.name ?? '',
      priceEUR: product?.priceEUR ?? 0,
      image: product?.image,
      qty,
    } as FormattedCartItem;
  });
};
