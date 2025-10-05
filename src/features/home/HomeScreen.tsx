import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { XStack, YStack } from "tamagui";
import {
  BottomSheet,
  useBottomSheetHeight,
} from "../../components/BottomSheet";
import { ProductCard } from "../../components/ProductCard";
import { QtySelectorModal } from "../../components/QtySelectorModal";
import { useCartStore } from "../../store/cartStore";
import { Product, useProductStore } from "../../store/productStore";
import {
  COLUMNS,
  HORIZONTAL_PADDING,
  ITEM_SPACING,
  ITEM_WIDTH,
} from "../../utils/layout";
import { HomeActionGroup } from "./HomeActionGroup";
import {
  pickerOptions,
  ProductTypePicker,
  ProductTypeValue,
} from "./ProductTypePicker";

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
  }, [fetchProducts]);

  const handleProductCardPress = (product: Product) => {
    setSelectedProduct(product);
    setIsQtyModalVisible(true);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => {
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
    },
    [cartItems],
  );

  const getItemLayout = useCallback(
    (_data: unknown, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    [],
  );

  return (
    <YStack
      flex={1}
      paddingVertical={20}
      paddingHorizontal={HORIZONTAL_PADDING}
      gap={10}
    >
      {isFetching ? (
        <ActivityIndicator size="large" color="$blue10" />
      ) : (
        <FlatList
          testID="products-flatlist"
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
          refreshing={isFetching}
          onRefresh={fetchProducts}
          getItemLayout={getItemLayout}
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
