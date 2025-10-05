import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Button, Paragraph, SizableText, XStack, YStack } from "tamagui";
import { createSelectSubtotalEUR, useCartStore } from "../../store/cartStore";
import { useCurrencyStore } from "../../store/currencyStore";
import { useProductStore } from "../../store/productStore";
import { formatMoney } from "../../utils/currency";
import { ITEM_WIDTH } from "../../utils/layout";

type CartActionGroupProps = {
  selectedSeat: string[];
  setIsSeatPickerVisible: (visible: boolean) => void;
};

function SeatButton({
  selectedSeat,
  setIsSeatPickerVisible,
}: CartActionGroupProps) {
  return (
    <Button
      justifyContent="space-between"
      alignItems="center"
      onPress={() => setIsSeatPickerVisible(true)}
    >
      <Paragraph size="$8" fontWeight="700">
        {selectedSeat[0]}
      </Paragraph>
      <Paragraph size="$8" fontWeight="700">
        {selectedSeat[1]}
      </Paragraph>
    </Button>
  );
}

function PaymentButton({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Button
      width={ITEM_WIDTH}
      height={ITEM_WIDTH}
      backgroundColor="$black5"
      position="relative"
      onPress={onPress}
    >
      <FontAwesome5 name={icon} size={36} color="white" />

      <YStack
        position="absolute"
        bottom={5}
        left={0}
        right={0}
        alignItems="center"
      >
        <Paragraph size="$3" color="$white10">
          {label}
        </Paragraph>
      </YStack>
    </Button>
  );
}

export function CartActionGroup({
  selectedSeat,
  setIsSeatPickerVisible,
}: CartActionGroupProps) {
  const navigation = useNavigation();

  const byId = useProductStore((state) => state.byId);
  const subtotalEUR = useCartStore(createSelectSubtotalEUR(byId));
  const checkout = useCartStore((state) => state.checkout);

  const currency = useCurrencyStore((state) => state.currency);

  const handlePayment = async () => {
    try {
      await checkout(selectedSeat);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <YStack gap={20}>
      <XStack flex={1} justifyContent="space-between">
        <YStack justifyContent="space-between">
          <SizableText size="$7" letterSpacing={1.5}>
            ASIENTO
          </SizableText>
          <SeatButton
            selectedSeat={selectedSeat}
            setIsSeatPickerVisible={setIsSeatPickerVisible}
          />
        </YStack>
        <YStack alignItems="flex-end" justifyContent="space-between">
          <SizableText size="$7" letterSpacing={1.5}>
            TOTAL
          </SizableText>
          <Paragraph size="$10" fontWeight="800">
            {formatMoney(subtotalEUR, currency)}
          </Paragraph>
        </YStack>
      </XStack>
      <XStack flex={1} justifyContent="space-between">
        <PaymentButton icon="coins" label="Effectivo" onPress={handlePayment} />
        <PaymentButton
          icon="credit-card"
          label="Tarjeta"
          onPress={handlePayment}
        />
      </XStack>
    </YStack>
  );
}
