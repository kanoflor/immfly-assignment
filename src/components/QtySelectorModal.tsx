import { useState } from "react";
import { Modal } from "react-native";
import { Button, H6, SizableText, XGroup, YStack } from "tamagui";
import { useCartStore } from "../store/cartStore";
import { Product } from "../store/productStore";

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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="rgba(0, 0, 0, 0.5)"
      >
        <YStack
          backgroundColor="white"
          gap={20}
          paddingVertical={20}
          paddingHorizontal={40}
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          minHeight={300}
          minWidth={300}
        >
          <H6>{selectedProduct.name}</H6>
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
          <Button backgroundColor="$blue8" onPress={addToCart}>
            <SizableText size="$6" fontWeight="400" color="white">
              Añadir al carrito
            </SizableText>
          </Button>
          <Button onPress={handleClose} chromeless>
            Cancelar
          </Button>
        </YStack>
      </YStack>
    </Modal>
  );
}
