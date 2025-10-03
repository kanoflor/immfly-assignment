import { Picker } from "@react-native-picker/picker";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, XStack, YStack } from "tamagui";

export const productTypeValues = [
  "business",
  "retail",
  "crew",
  "happy_hour",
  "invitacion_business",
  "invitacion_turista",
] as const;

export type ProductTypeValue = (typeof productTypeValues)[number];

export type PickerOption<T> = {
  label: string;
  value: T;
};

export const pickerOptions: PickerOption<ProductTypeValue>[] = [
  { label: "Business", value: "business" },
  { label: "Retail", value: "retail" },
  { label: "Crew", value: "crew" },
  { label: "Happy hour", value: "happy_hour" },
  { label: "Invitación business", value: "invitacion_business" },
  { label: "Invitación turista", value: "invitacion_turista" },
];

type ProductTypePickerProps = {
  isVisible: boolean;
  selectedProductType: ProductTypeValue;
  setSelectedProductType: Dispatch<SetStateAction<ProductTypeValue>>;
  onClose: () => void;
};

export function ProductTypePicker({
  isVisible,
  selectedProductType,
  setSelectedProductType,
  onClose,
}: ProductTypePickerProps) {
  const [selectedProductTypeState, setSelectedProductTypeState] =
    useState<ProductTypeValue>(selectedProductType);

  const handleConfirm = () => {
    setSelectedProductType(selectedProductTypeState);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
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
          minHeight={300}
          minWidth={300}
        >
          <YStack alignItems="center">
            <Picker
              selectedValue={selectedProductTypeState}
              onValueChange={(value) => setSelectedProductTypeState(value)}
              style={styles.picker}
            >
              {pickerOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>

            <XStack gap={20}>
              <Button onPress={onClose} chromeless>
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
      </YStack>
    </Modal>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 24,
    width: 300,
  },
});
