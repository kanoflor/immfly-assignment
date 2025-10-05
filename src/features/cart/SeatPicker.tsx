import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, XStack } from 'tamagui';
import { ModalDialog } from '../../components/ModalDialog';

const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];

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
    <ModalDialog isVisible={isVisible} onClose={onClose}>
      <ModalDialog.Content title="Seleccionar Asiento">
        <XStack gap={20} alignItems="center">
          <Picker
            selectedValue={selectedLetter}
            onValueChange={value => setSelectedLetter(value)}
            style={styles.picker}
          >
            {seatLetters.map(letter => (
              <Picker.Item key={letter} label={letter} value={letter} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedNumber}
            onValueChange={value => setSelectedNumber(value)}
            style={styles.picker}
          >
            {seatNumbers.map(number => (
              <Picker.Item key={number} label={number} value={number} />
            ))}
          </Picker>
        </XStack>
      </ModalDialog.Content>

      <ModalDialog.Footer>
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
      </ModalDialog.Footer>
    </ModalDialog>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 18,
    height: 150,
    width: 150,
  },
});
