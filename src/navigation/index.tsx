import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart } from "../features/cart/Cart";
import { Home } from "../features/home/Home";
import { NotFound } from "./screens/NotFound";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
        headerShown: false,
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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
