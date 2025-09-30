import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export function Cart() {
  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
