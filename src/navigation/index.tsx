import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { H4, XStack } from "tamagui";
import { Cart } from "../features/cart/CartScreen";
import { Home } from "../features/home/HomeScreen";
import { NotFound } from "./screens/NotFound";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Refrescos",
        headerShown: true,
        headerTitle: () => (
          <XStack flex={1} justifyContent="flex-start">
            <H4 fontWeight="800">Refrescos</H4>
          </XStack>
        ),
      },
    },
    Cart: {
      screen: Cart,
      options: () => ({
        presentation: "modal",
        title: "Cart",
        headerShown: false,
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

export type RootParamList = RootStackParamList;
