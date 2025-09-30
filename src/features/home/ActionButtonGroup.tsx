import { Button, SizableText, Text, XGroup } from "tamagui";
import { Product } from "../../store/productStore";

export function ActionButtonGroup({ cartItems }: { cartItems: Product[] }) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceEUR, 0);
  return (
    <XGroup>
      <XGroup.Item>
        <Button backgroundColor="$blue10" size="$6">
          <SizableText color="white" size="$5">
            PAGAR
          </SizableText>
          <Text color="white" fontSize={16} fontWeight={800}>
            {totalPrice}
          </Text>
          <SizableText color="white" size="$5">
            EUR
          </SizableText>
        </Button>
      </XGroup.Item>
      <XGroup.Item>
        <Button backgroundColor="$blue11" size="$6" color="white">
          {`Second `}
        </Button>
      </XGroup.Item>
    </XGroup>
  );
}
