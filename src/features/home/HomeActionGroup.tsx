import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Button, SizableText, Text, XGroup, XStack, YStack } from "tamagui";
import { NumberCircle } from "../../components/NumberCircle";
import {
  createSelectSubtotalEUR,
  selectTotalQty,
  useCartStore,
} from "../../store/cartStore";
import { useCurrencyStore } from "../../store/currencyStore";
import { useProductStore } from "../../store/productStore";
import { CurrencyPicker } from "./CurrencyPicker";
import { ProductTypeValue, pickerOptions } from "./ProductTypePicker";

type HomeActionGroupProps = {
  selectedProductType: ProductTypeValue;
  onSecondButtonPress: () => void;
};

export function HomeActionGroup({
  selectedProductType,
  onSecondButtonPress,
}: HomeActionGroupProps) {
  const navigation = useNavigation();

  const currency = useCurrencyStore((state) => state.currency);
  const byId = useProductStore((state) => state.byId);
  const subtotalEUR = useCartStore(createSelectSubtotalEUR(byId));
  const totalQty = useCartStore(selectTotalQty);

  const selectedProductTypeLabel =
    pickerOptions.find((o) => o.value === selectedProductType)?.label ||
    selectedProductType;

  return (
    <YStack alignItems="center" gap={16}>
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
              {currency}
            </SizableText>
          </Button>
        </XGroup.Item>
        <XGroup.Item>
          <Button
            backgroundColor="$blue11"
            size="$5"
            color="white"
            height="100%"
            width={140}
            onPress={onSecondButtonPress}
          >
            <XStack alignItems="center" justifyContent="center" gap={8}>
              <Text
                color="white"
                fontSize={14}
                numberOfLines={2}
                textAlign="center"
                ellipsizeMode="tail"
                lineHeight={18}
                flexShrink={1}
              >
                {selectedProductTypeLabel}
              </Text>
              <FontAwesome5 name="chevron-down" size={16} color="white" />
            </XStack>
          </Button>
        </XGroup.Item>
        {totalQty > 0 ? (
          <XStack position="absolute" right={-12} top={-12}>
            <NumberCircle number={totalQty} backgroundColor="$green7" />
          </XStack>
        ) : null}
      </XGroup>
      <CurrencyPicker />
    </YStack>
  );
}
