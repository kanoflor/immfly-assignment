import { Picker } from '@react-native-picker/picker';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, XStack } from 'tamagui';
import { ModalDialog } from '../../components/ModalDialog';

export const productTypeValues = [
  'business',
  'retail',
  'crew',
  'happy_hour',
  'invitacion_business',
  'invitacion_turista',
] as const;

export type ProductTypeValue = (typeof productTypeValues)[number];

export type PickerOption<T> = {
  label: string;
  value: T;
};

export const pickerOptions: PickerOption<ProductTypeValue>[] = [
  { label: 'Business', value: 'business' },
  { label: 'Retail', value: 'retail' },
  { label: 'Crew', value: 'crew' },
  { label: 'Happy hour', value: 'happy_hour' },
  { label: 'Invitación business', value: 'invitacion_business' },
  { label: 'Invitación turista', value: 'invitacion_turista' },
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
    <ModalDialog isVisible={isVisible} onClose={onClose}>
      <ModalDialog.Content title="Seleccionar Tipo de Producto">
        <Picker
          selectedValue={selectedProductTypeState}
          onValueChange={value => setSelectedProductTypeState(value)}
          style={styles.picker}
        >
          {pickerOptions.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </ModalDialog.Content>

      <ModalDialog.Footer>
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
      </ModalDialog.Footer>
    </ModalDialog>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 24,
    width: 300,
  },
});
