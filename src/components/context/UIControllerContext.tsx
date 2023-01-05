import { createContext, useContext, useState } from "react";
import * as React from "react";
import { useCategories } from "services/product";

const initialState = {
  categories: [],
  progress: 0,
};

interface ICategory {
  _id: string,
  count: number
}

export interface UIControllerProps {
  setProgress?: (prevState) => void,
  categories?: ICategory[],
  progress?: number,
}

export const UIControllerContext = createContext<UIControllerProps>(initialState)

export function useUIController() {
  return useContext(UIControllerContext);
}

export const UIControllerProvider = ({ children }) => {
  const { categories } = useCategories();
  const [progress, setProgress] = useState(0)

  const providerValues: UIControllerProps = {
    categories, progress, setProgress
  };

  return (
    <UIControllerContext.Provider value={providerValues}>
      {children}
    </UIControllerContext.Provider>
  );
}
