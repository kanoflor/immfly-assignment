import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ForwardedRef, forwardRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, H6, SizableText, XGroup, XStack, YStack } from "tamagui";
import { useCartStore } from "../store/cartStore";
import { Product } from "../store/productStore";

type QuantitySelectorModalProps = {
  selectedProduct: Product;
};

export const QuantitySelectorModal = forwardRef<
  BottomSheetModal,
  QuantitySelectorModalProps
>(function QuantitySelectorModal(props, ref: ForwardedRef<BottomSheetModal>) {
  console.log("QuantitySelectorModal");
  const { selectedProduct } = props;
  const cartItems = useCartStore((state) => state.cartItems);
  const addItemByQty = useCartStore((state) => state.addItemByQty);

  const [qty, setQty] = useState(cartItems[selectedProduct.id] ?? 1);

  const addToCart = () => {
    addItemByQty(selectedProduct.id, qty);
    if (ref && typeof ref !== "function") {
      ref.current?.close();
    }
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

  return (
    <BottomSheetModal ref={ref} onDismiss={() => setQty(1)} {...props}>
      <BottomSheetView style={styles.contentContainer}>
        <YStack alignItems="center" gap={20}>
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
        </YStack>
        <XStack height={40} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
