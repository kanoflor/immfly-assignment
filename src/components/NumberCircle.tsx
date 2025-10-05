import { Circle, FontSizeTokens, SizableText, SizeTokens } from "tamagui";

export function NumberCircle({
  number,
  backgroundColor,
  circleSize = "$3",
  textSize = "$5",
}: {
  number: number;
  backgroundColor: string;
  circleSize?: SizeTokens;
  textSize?: FontSizeTokens;
}) {
  return (
    <Circle size={circleSize} backgroundColor={backgroundColor}>
      <SizableText size={textSize} color="white" fontWeight="500">
        {number}
      </SizableText>
    </Circle>
  );
}
