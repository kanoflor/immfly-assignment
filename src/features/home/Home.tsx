import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { H4, XStack, YStack } from "tamagui";
import {
  BottomSheet,
  useBottomSheetHeight,
} from "../../components/BottomSheet";
import { ProductCard } from "../../components/ProductCard";
import { QtySelectorModal } from "../../components/QtySelectorModal";
import { useCartStore } from "../../store/cartStore";
import { Product, useProductStore } from "../../store/productStore";
import { HomeActionGroup } from "./HomeActionGroup";
import {
  pickerOptions,
  ProductTypePicker,
  ProductTypeValue,
} from "./ProductTypePicker";

const { width: screenWidth } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16;
const ITEM_SPACING = 12;
const COLUMNS = 2;
const ITEM_WIDTH =
  (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING * (COLUMNS - 1)) /
  COLUMNS;

export function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQtyModalVisible, setIsQtyModalVisible] = useState(false);

  const [selectedProductType, setSelectedProductType] =
    useState<ProductTypeValue>(pickerOptions[0].value);
  const [isProductTypePickerVisible, setIsProductTypePickerVisible] =
    useState(false);

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const isFetching = useProductStore((state) => state.isFetching);

  const cartItems = useCartStore((state) => state.cartItems);

  const { height: bottomSheetHeight } = useBottomSheetHeight();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCardPress = (product: Product) => {
    setSelectedProduct(product);
    setIsQtyModalVisible(true);
  };

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const isRightColumn = (index + 1) % COLUMNS === 0;
    const selectedQuantity = cartItems[item.id] ?? 0;
    return (
      <View
        style={[styles.itemContainer, !isRightColumn && styles.itemSpacing]}
      >
        <ProductCard
          product={item}
          selectedQuantity={selectedQuantity}
          width={ITEM_WIDTH}
          height={ITEM_WIDTH}
          onPress={() => handleProductCardPress(item)}
        />
      </View>
    );
  };

  return (
    // <RefreshControl />

    // TODO: background color to be grey
    <YStack
      flex={1}
      paddingVertical={60}
      paddingHorizontal={HORIZONTAL_PADDING}
      gap={10}
    >
      <H4 fontWeight="800">Refrescos</H4>
      {isFetching ? (
        <ActivityIndicator size="large" color="$blue10" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: bottomSheetHeight },
          ]}
          columnWrapperStyle={styles.row}
          ItemSeparatorComponent={() => <XStack height={ITEM_SPACING} />}
          showsVerticalScrollIndicator={false}
          // initialNumToRender={10}
          // removeClippedSubviews={true}
          // getItemLayout={getItemLayout}
        />
      )}
      <BottomSheet>
        <YStack justifyContent="center" alignItems="center">
          <HomeActionGroup
            onSecondButtonPress={() => setIsProductTypePickerVisible(true)}
            selectedProductType={selectedProductType}
          />
        </YStack>
      </BottomSheet>

      {selectedProduct ? (
        <QtySelectorModal
          selectedProduct={selectedProduct}
          visible={isQtyModalVisible}
          onClose={() => setIsQtyModalVisible(false)}
        />
      ) : null}

      <ProductTypePicker
        isVisible={isProductTypePickerVisible}
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
        onClose={() => setIsProductTypePickerVisible(false)}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 0,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  itemSpacing: {
    marginRight: ITEM_SPACING,
  },
});
