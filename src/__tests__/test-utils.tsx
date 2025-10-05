import { NavigationContainer } from "@react-navigation/native";
import { defaultConfig } from "@tamagui/config/v4";
import { render, RenderOptions } from "@testing-library/react-native";
import { ReactElement, ReactNode } from "react";
import { createTamagui, TamaguiProvider } from "tamagui";
import { BottomSheetProvider } from "../components/BottomSheet";

const config = createTamagui(defaultConfig);

interface AllTheProvidersProps {
  children: ReactNode;
}

export const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <NavigationContainer>
      <TamaguiProvider config={config}>
        <BottomSheetProvider>{children}</BottomSheetProvider>
      </TamaguiProvider>
    </NavigationContainer>
  );
};

const customRender = (ui: ReactElement, options: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
