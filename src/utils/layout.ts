import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
export const HORIZONTAL_PADDING = 16;
export const ITEM_SPACING = 12;
export const COLUMNS = 2;
export const ITEM_WIDTH =
  (screenWidth - HORIZONTAL_PADDING * 2 - ITEM_SPACING * (COLUMNS - 1)) /
  COLUMNS;
