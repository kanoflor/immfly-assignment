import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
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
import { QtySelectorModal } from "../../components/QtySelectorModal";
import { useCartStore } from "../../store/cartStore";
import { Product, useProductStore } from "../../store/productStore";
import { CartActionGroup } from "./CartActionGroup";
import { SeatPicker } from "./SeatPicker";
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
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={renderRightActions}
      rightThreshold={deleteThreshold}
      onSwipeableWillOpen={handleDelete}
    >
      <YStack backgroundColor="#F5F5F5">
        <Pressable onPress={() => onPress(item)}>
          <XStack alignItems="center" gap={10} paddingRight={20}>
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
        </Pressable>
      </YStack>
    </ReanimatedSwipeable>
  );
}

export function Cart() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedSeat, setSelectedSeat] = useState<string[]>(["A", "1"]);
  const [isSeatPickerVisible, setIsSeatPickerVisible] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const byId = useProductStore((state) => state.byId);
  const isProcessingPayment = useCartStore(
    (state) => state.isProcessingPayment
  );

  const formattedCartItems = formatCartItems(cartItems, byId);

  const handlePresentModalPress = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

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
          <CartActionGroup
            selectedSeat={selectedSeat}
            setIsSeatPickerVisible={setIsSeatPickerVisible}
          />
        </BottomSheet>
      </YStack>

      {selectedProduct ? (
        <QtySelectorModal
          selectedProduct={selectedProduct}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      ) : null}

      <SeatPicker
        isVisible={isSeatPickerVisible}
        onClose={() => setIsSeatPickerVisible(false)}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
      />

      {isProcessingPayment && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    flex: 1,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "100%",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
