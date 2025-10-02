import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated from "react-native-reanimated";
import {
  Button,
  H4,
  Image,
  Separator,
  SizableText,
  XStack,
  YStack,
} from "tamagui";
import { BottomSheet } from "../../components/BottomSheet";
import { QuantitySelectorModal } from "../../components/QuantitySelectorModal";
import { useCartStore } from "../../store/cartStore";
import { Product, useProductStore } from "../../store/productStore";
import { CartActionGroup } from "./CartActionGroup";
import { formatCartItems, FormattedCartItem } from "./util";

function CartHeader() {
  const navigation = useNavigation();
  return (
    <XStack justifyContent="space-between">
      <YStack>
        <H4 fontWeight="800">Ticket</H4>
        <SizableText theme="alt1" size="$4">
          Productos seleccionados
        </SizableText>
      </YStack>
      <Button size="$4" circular onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color="grey" />
      </Button>
    </XStack>
  );
}

const { width: screenWidth } = Dimensions.get("window");

function CartListItem({
  item,
  onPress,
}: {
  item: FormattedCartItem;
  onPress: (product: Product) => void;
}) {
  const removeItem = useCartStore((state) => state.removeItem);

  const deleteThreshold = screenWidth * 0.8;

  const handleDelete = () => {
    removeItem(item.id);
  };

  const renderRightActions = () => {
    return (
      <Animated.View style={styles.deleteAction}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      rightThreshold={deleteThreshold}
      onSwipeableWillOpen={() => handleDelete()}
    >
      <YStack backgroundColor="white">
        <TouchableOpacity onPress={() => onPress(item)}>
          <XStack alignItems="center" gap={10}>
            <XStack borderRadius={8} overflow="hidden">
              <Image
                alignSelf="center"
                source={{
                  width: 50,
                  height: 50,
                  uri: item.image,
                }}
              />
            </XStack>
            <SizableText size="$5" fontWeight="800" width={150}>
              {item.name}
            </SizableText>
            <SizableText size="$5" fontWeight="400">
              {item.priceEUR} €
            </SizableText>
            <XStack flex={1} />
            <SizableText size="$3" theme="alt2">
              {item.qty}
            </SizableText>
          </XStack>
          <Separator marginVertical={8} />
        </TouchableOpacity>
      </YStack>
    </ReanimatedSwipeable>
  );
}

export function Cart() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartItems = useCartStore((state) => state.cartItems);
  const byId = useProductStore((state) => state.byId);

  const formattedCartItems = formatCartItems(cartItems, byId);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <YStack gap={20} flex={1} paddingVertical={30} paddingHorizontal={20}>
        <CartHeader />

        <YStack>
          {formattedCartItems.map((item) => (
            <CartListItem
              key={item.id}
              item={item}
              onPress={handlePresentModalPress}
            />
          ))}
        </YStack>

        <BottomSheet>
          <CartActionGroup />
        </BottomSheet>
      </YStack>

      {selectedProduct ? (
        <QuantitySelectorModal
          ref={bottomSheetModalRef}
          selectedProduct={selectedProduct}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
  },
  deleteAction: {
    flex: 1,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
  },
});
