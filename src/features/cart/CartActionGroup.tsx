import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button, Paragraph, SizableText, XStack, YStack } from "tamagui";
import { createSelectSubtotalEUR, useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";

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

function PaymentButton({ icon, label }: { icon: string; label: string }) {
  return (
    <Button
      width={160}
      height={160}
      backgroundColor="$black5"
      position="relative"
    >
      {/* TODO: Icon is not centered */}
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
  const byId = useProductStore((state) => state.byId);
  const subtotalEUR = useCartStore(createSelectSubtotalEUR(byId));

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
            {subtotalEUR}
          </Paragraph>
        </YStack>
      </XStack>
      <XStack flex={1} justifyContent="space-between">
        <PaymentButton icon="coins" label="Effectivo" />
        <PaymentButton icon="credit-card" label="Tarjeta" />
      </XStack>
    </YStack>
  );
}
