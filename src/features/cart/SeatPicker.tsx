import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { Button, SizableText, XStack, YStack } from "tamagui";

const seatLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

const seatNumbers = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

type SeatPickerProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedSeat: string[];
  setSelectedSeat: (seat: string[]) => void;
};

export function SeatPicker({
  isVisible,
  onClose,
  selectedSeat,
  setSelectedSeat,
}: SeatPickerProps) {
  const [selectedLetter, setSelectedLetter] = useState(selectedSeat[0]);
  const [selectedNumber, setSelectedNumber] = useState(selectedSeat[1]);

  const handleConfirm = () => {
    const seatCode = [selectedLetter, selectedNumber];
    setSelectedSeat(seatCode);
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
          minHeight={350}
          minWidth={300}
        >
          <SizableText size="$6" fontWeight="bold">
            Seleccionar Asiento
          </SizableText>

          <XStack gap={20} alignItems="center">
            <Picker
              selectedValue={selectedLetter}
              onValueChange={(value) => setSelectedLetter(value)}
              style={styles.picker}
            >
              {seatLetters.map((letter) => (
                <Picker.Item key={letter} label={letter} value={letter} />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedNumber}
              onValueChange={(value) => setSelectedNumber(value)}
              style={styles.picker}
            >
              {seatNumbers.map((number) => (
                <Picker.Item key={number} label={number} value={number} />
              ))}
            </Picker>
          </XStack>

          <XStack gap={20} marginTop={40}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 18,
    width: 150,
    height: 150,
  },
});
