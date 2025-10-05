import React, { createContext, ReactNode, useContext, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { YStack, YStackProps } from 'tamagui';

// BottomSheet Context
type BottomSheetContextType = {
  height: number;
  setHeight: (height: number) => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [height, setHeight] = useState(0);

  return (
    <BottomSheetContext.Provider value={{ height, setHeight }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

/**
 * Custom context hook to access the current bottom sheet height and setter.
 */
export function useBottomSheetHeight() {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error(
      'useBottomSheetHeight must be used within a BottomSheetProvider'
    );
  }
  return context;
}

// BottomSheet Component
type BottomSheetProps = {
  children: React.ReactNode;
} & Omit<
  YStackProps,
  | 'position'
  | 'bottom'
  | 'left'
  | 'right'
  | 'width'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'onLayout'
>;

export function BottomSheet({ children, ...props }: BottomSheetProps) {
  const { setHeight } = useBottomSheetHeight();

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="$background"
      borderTopLeftRadius="$8"
      borderTopRightRadius="$8"
      paddingHorizontal="$4"
      paddingVertical="$8"
      elevation="$4"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      zIndex={1}
      onLayout={handleLayout}
      {...props}
    >
      {children}
    </YStack>
  );
}
