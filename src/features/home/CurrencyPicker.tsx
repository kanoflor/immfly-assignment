import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Button, SizableText, Text, XStack, YStack } from "tamagui";
import { createSelectSubtotalEUR, useCartStore } from "../../store/cartStore";
import { useCurrencyStore } from "../../store/currencyStore";
import { useProductStore } from "../../store/productStore";
import { Currency, formatMoney } from "../../utils/currency";
import { PickerOption } from "./ProductTypePicker";

const currencyOptions: PickerOption<Currency>[] = [
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
  { label: "GBP", value: "GBP" },
];

export function CurrencyPicker() {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  const byId = useProductStore((state) => state.byId);
  const subtotalEUR = useCartStore(createSelectSubtotalEUR(byId));

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);

  const buttonTitle = currencyOptions
    .filter((option) => option.value !== currency)
    .map(
      (option) => `${formatMoney(subtotalEUR, option.value)} ${option.label}`
    )
    .join(" | ");

  const handleConfirm = () => {
    setCurrency(selectedCurrency);
    setIsVisible(false);
  };

  return (
    <>
      <Pressable onPress={() => setIsVisible(true)}>
        <Text>{buttonTitle}</Text>
      </Pressable>

      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
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
            alignItems="center"
            minHeight={350}
            minWidth={300}
          >
            <SizableText size="$6" fontWeight="bold">
              Seleccionar Moneda
            </SizableText>
            <XStack gap={20} alignItems="center">
              <Picker<Currency>
                selectedValue={selectedCurrency}
                onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
                style={styles.picker}
              >
                {currencyOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </XStack>
            <XStack gap={20} marginTop={40}>
              <Button onPress={() => setIsVisible(false)} chromeless>
                Cancelar
              </Button>
              <Button
                backgroundColor="$blue10"
                color="white"
                onPress={handleConfirm}
              >
                Confirmar
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 24,
    width: 300,
  },
});
