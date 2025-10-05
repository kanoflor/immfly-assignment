import { useState } from "react";
import { Button, SizableText, XGroup, XStack } from "tamagui";
import { useCartStore } from "../store/cartStore";
import { Product } from "../store/productStore";
import { ModalDialog } from "./ModalDialog";

type QtySelectorModalProps = {
  selectedProduct: Product;
  visible: boolean;
  onClose: () => void;
};

export function QtySelectorModal({
  selectedProduct,
  visible,
  onClose,
}: QtySelectorModalProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const addItemByQty = useCartStore((state) => state.addItemByQty);

  const [qty, setQty] = useState(cartItems[selectedProduct.id] ?? 1);

  const resetQty = () => {
    setQty(1);
  };

  const incrementQty = () => {
    if (qty >= selectedProduct.stock) {
      // A message can be shown here to the user that the product is out of stock
      return;
    }
    setQty(qty + 1);
  };

  const decrementQty = () => {
    if (qty <= 0) return;
    setQty(qty - 1);
  };

  const addToCart = () => {
    addItemByQty(selectedProduct.id, qty);
    resetQty();
    onClose();
  };

  const handleClose = () => {
    resetQty();
    onClose();
  };

  return (
    <ModalDialog isVisible={visible} onClose={handleClose}>
      <ModalDialog.Content title={selectedProduct.name}>
        <XGroup>
          <Button disabled={qty <= 0} onPress={decrementQty}>
            <SizableText size="$8">-</SizableText>
          </Button>
          <SizableText paddingHorizontal={20} alignSelf="center" size="$8">
            {qty}
          </SizableText>
          <Button
            disabled={qty >= selectedProduct.stock}
            onPress={incrementQty}
          >
            <SizableText size="$8">+</SizableText>
          </Button>
        </XGroup>
      </ModalDialog.Content>

      <ModalDialog.Footer>
        <XStack gap={20} marginTop={20}>
          <Button onPress={handleClose} chromeless>
            Cancelar
          </Button>
          <Button backgroundColor="$blue8" onPress={addToCart}>
            <SizableText size="$6" fontWeight="400" color="white">
              Añadir al carrito
            </SizableText>
          </Button>
        </XStack>
      </ModalDialog.Footer>
    </ModalDialog>
  );
}
