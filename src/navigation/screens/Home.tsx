import { Button, Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ProductCard } from "../../components/ProductCard";
import { useProductStore } from "../../store/productStore";

export function Home() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen 1</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button screen="Cart">Go to Screen 2</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
