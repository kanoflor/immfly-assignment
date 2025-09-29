import { Button, Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

// https://my-json-server.typicode.com/kanoflor/immfly-assignment

type Product = {
  id: string;
  name: string;
  priceEUR: number;
  stock: number;
  image: string;
};

const useProducts = (): Product[] => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/kanoflor/immfly-assignment/products"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return products;
};

export function Home() {
  const products = useProducts();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen 1</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
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
});
