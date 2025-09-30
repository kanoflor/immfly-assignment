import { useEffect } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { H4, XStack } from "tamagui";
import {
  BottomSheet,
  useBottomSheetHeight,
} from "../../components/BottomSheet";
import { ProductCard } from "../../components/ProductCard";
import { useProductStore } from "../../store/productStore";

const { width: screenWidth } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16;
const ITEM_SPACING = 12;
const COLUMNS = 2;
const ITEM_WIDTH =
  (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING * (COLUMNS - 1)) /
  COLUMNS;

export function Home() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const { height: bottomSheetHeight } = useBottomSheetHeight();

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isRightColumn = (index + 1) % COLUMNS === 0;
    return (
      <View
        style={[styles.itemContainer, !isRightColumn && styles.itemSpacing]}
      >
        <ProductCard product={item} width={ITEM_WIDTH} height={ITEM_WIDTH} />
      </View>
    );
  };

  return (
    // TODO: background color to be grey
    <View style={styles.container}>
      <H4 fontWeight="800">Refrescos</H4>
      <FlatList
        // TODO: パフォーマンス改善
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
      />
      <BottomSheet>
        <XStack height={300} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    paddingBottom: 0, // To dynamically set paddingBottom
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
