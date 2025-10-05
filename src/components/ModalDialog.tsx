import React, { createContext } from 'react';
import { Modal } from 'react-native';
import { SizableText, YStack } from 'tamagui';

type ModalDialogContextType = {
  isVisible: boolean;
  onClose: () => void;
};

const ModalDialogContext = createContext<ModalDialogContextType | null>(null);

type ModalDialogProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
};

type ModalDialogContentProps = {
  children: React.ReactNode;
  title?: string;
};

type ModalDialogFooterProps = {
  children: React.ReactNode;
};

function ModalDialogContent({ children, title }: ModalDialogContentProps) {
  return (
    <>
      {title ? (
        <SizableText size="$6" fontWeight="bold">
          {title}
        </SizableText>
      ) : null}
      {children}
    </>
  );
}

function ModalDialogFooter({ children }: ModalDialogFooterProps) {
  return (
    <YStack flexDirection="row" justifyContent="flex-end" gap={10}>
      {children}
    </YStack>
  );
}

export function ModalDialog({
  children,
  isVisible,
  onClose,
}: ModalDialogProps) {
  const contextValue = { isVisible, onClose };

  return (
    <ModalDialogContext.Provider value={contextValue}>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
        >
          <YStack
            backgroundColor="white"
            gap={20}
            paddingVertical={20}
            paddingHorizontal={40}
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            minHeight={300}
            minWidth={300}
          >
            {children}
          </YStack>
        </YStack>
      </Modal>
    </ModalDialogContext.Provider>
  );
}

ModalDialog.Content = ModalDialogContent;
ModalDialog.Footer = ModalDialogFooter;
