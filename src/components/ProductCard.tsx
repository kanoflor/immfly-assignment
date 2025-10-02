import {
  Card,
  CardProps,
  Image,
  SizableText,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { Product } from "../store/productStore";
import { NumberCircle } from "./NumberCircle";

type ProductCardProps = {
  product: Product;
  selectedQuantity?: number;
  onPress?: () => void;
} & CardProps;

export function ProductCard({
  product,
  selectedQuantity = 0,
  onPress,
  ...props
}: ProductCardProps) {
  const PriceTag = () => {
    return (
      <YStack
        justifyContent="flex-end"
        backgroundColor="black"
        paddingVertical={4}
        paddingHorizontal={10}
        borderRadius={20}
      >
        <Text
          fontSize={14}
          fontWeight="600"
          color="white"
        >{`${product.priceEUR.toFixed(2)} €`}</Text>
      </YStack>
    );
  };

  return (
    <Card
      size="$4"
      borderRadius={10}
      elevate
      pressStyle={{ scale: 0.95 }}
      onPress={onPress}
      {...props}
    >
      <Card.Header position="relative">
        {selectedQuantity > 0 ? (
          <XStack position="absolute" top={8} right={8}>
            <NumberCircle number={selectedQuantity} backgroundColor="$blue11" />
          </XStack>
        ) : null}
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} justifyContent="space-between" alignItems="flex-end">
          <YStack flex={1}>
            <SizableText size="$4" fontWeight="800" lineHeight={18}>
              {product.name}
            </SizableText>
            <SizableText
              theme="alt2"
              size="$3"
            >{`${product.stock} unidades`}</SizableText>
          </YStack>
          <PriceTag />
        </XStack>
      </Card.Footer>
      <Card.Background borderRadius={10}>
        <Image
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: product.image,
          }}
        />
      </Card.Background>
    </Card>
  );
}
