import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { QuantitySelectorModal } from "../components/QuantitySelectorModal";
import { Product } from "../store/productStore";

interface QuantitySelectorModalContextType {
  openQuantitySelector: (product: Product) => void;
  closeQuantitySelector: () => void;
  isOpen: boolean;
  selectedProduct: Product | null;
}

const QuantitySelectorModalContext = createContext<
  QuantitySelectorModalContextType | undefined
>(undefined);

interface QuantitySelectorModalProviderProps {
  children: ReactNode;
}

export function QuantitySelectorModalProvider({
  children,
}: QuantitySelectorModalProviderProps) {
  const modalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openQuantitySelector = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeQuantitySelector = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (isOpen && selectedProduct) {
      modalRef.current?.present();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen, selectedProduct]);

  const handleDismiss = () => {
    closeQuantitySelector();
  };

  const contextValue: QuantitySelectorModalContextType = {
    openQuantitySelector,
    closeQuantitySelector,
    isOpen,
    selectedProduct,
  };

  return (
    <QuantitySelectorModalContext.Provider value={contextValue}>
      {children}
      {selectedProduct && (
        <QuantitySelectorModal
          ref={modalRef}
          selectedProduct={selectedProduct}
          onDismiss={handleDismiss}
        />
      )}
    </QuantitySelectorModalContext.Provider>
  );
}

export function useQuantitySelectorModal() {
  const context = useContext(QuantitySelectorModalContext);
  if (context === undefined) {
    throw new Error(
      "useQuantitySelectorModal must be used within a QuantitySelectorModalProvider"
    );
  }
  return context;
}
