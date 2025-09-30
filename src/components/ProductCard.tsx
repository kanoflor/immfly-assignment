import {
  Card,
  CardProps,
  Circle,
  Image,
  SizableText,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { Product } from "../store/productStore";

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
          <Circle
            size={24}
            backgroundColor="$blue10"
            position="absolute"
            top={8}
            right={8}
            zIndex={1}
          >
            <Text color="white" fontSize={12} fontWeight="bold">
              {selectedQuantity}
            </Text>
          </Circle>
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
          <YStack justifyContent="flex-end">
            <Text fontSize={14} fontWeight="bold">{`${product.priceEUR.toFixed(
              2
            )} €`}</Text>
          </YStack>
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
// TODO: priceのラベル黒塗り
