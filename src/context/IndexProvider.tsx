// contexts/IndexContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Context 타입 정의
interface IndexContextProps {
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

const IndexContext = createContext<IndexContextProps | undefined>(undefined);

export const IndexProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <IndexContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </IndexContext.Provider>
  );
};

// 커스텀 훅 생성
export const useIndexContext = () => {
  const context = useContext(IndexContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
