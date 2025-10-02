import { useNavigation } from "@react-navigation/native";
import { Button, SizableText, Text, XGroup, XStack } from "tamagui";
import { NumberCircle } from "../../components/NumberCircle";
import {
  createSelectSubtotalEUR,
  selectTotalQty,
  useCartStore,
} from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";

export function ActionButtonGroup() {
  const navigation = useNavigation();

  const byId = useProductStore((state) => state.byId);
  const subtotalEUR = useCartStore(createSelectSubtotalEUR(byId));
  const totalQty = useCartStore(selectTotalQty);

  return (
    <XGroup position="relative">
      <XGroup.Item>
        <Button
          backgroundColor="$blue10"
          size="$6"
          disabled={totalQty === 0}
          onPress={() => navigation.navigate("Cart")}
        >
          <SizableText color="white" size="$5">
            PAGAR
          </SizableText>
          <Text color="white" fontSize={16} fontWeight={800}>
            {subtotalEUR}
          </Text>
          <SizableText color="white" size="$5">
            EUR
          </SizableText>
        </Button>
      </XGroup.Item>
      <XGroup.Item>
        <Button backgroundColor="$blue11" size="$6" color="white">
          Second
        </Button>
      </XGroup.Item>
      {totalQty > 0 ? (
        <XStack position="absolute" right={-12} top={-12}>
          <NumberCircle number={totalQty} backgroundColor="$green7" />
        </XStack>
      ) : null}
    </XGroup>
  );
}
