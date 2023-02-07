import { createContext, useContext, useState } from "react";
import * as React from "react";
import { useCategories } from "services/product";

const initialState = {
  categories: [],
  progress: 0,
};

type Category  = {
  _id: string,
  count: number
}

export interface UIControllerProps {
  setProgress: (prevState) => void,
  setAmountAllItemsCart: (prevState) => void,
  categories: Category[],
  progress: number,
  amountAllItemsCart: number,
}

export const UIControllerContext = createContext<Partial<UIControllerProps>>(initialState)

export function useUIController() {
  return useContext(UIControllerContext);
}

export const UIControllerProvider = ({ children }) => {
  const { categories } = useCategories();
  const [amountAllItemsCart, setAmountAllItemsCart] = useState(0)
  const [progress, setProgress] = useState(0)

  const providerValues: UIControllerProps = {
    categories, progress, setProgress, amountAllItemsCart, setAmountAllItemsCart
  };

  return (
    <UIControllerContext.Provider value={providerValues}>
      {children}
    </UIControllerContext.Provider>
  );
}
