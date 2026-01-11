import { createContext, useContext, useState, ReactNode } from "react";

interface BackButtonContextType {
  hasBackButton: boolean;
  setHasBackButton: (has: boolean) => void;
}

const BackButtonContext = createContext<BackButtonContextType | undefined>(undefined);

interface BackButtonProviderProps {
  children: ReactNode;
}

export function BackButtonProvider({ children }: BackButtonProviderProps) {
  const [hasBackButton, setHasBackButton] = useState(false);

  return (
    <BackButtonContext.Provider value={{ hasBackButton, setHasBackButton }}>
      {children}
    </BackButtonContext.Provider>
  );
}

export function useBackButton() {
  const context = useContext(BackButtonContext);
  if (context === undefined) {
    throw new Error("useBackButton must be used within a BackButtonProvider");
  }
  return context;
}
