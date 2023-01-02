import { createContext, FC, Reducer, useContext, useEffect, useReducer, useState } from "react";
import reducer, {
  uiControllerActions,
  uiControllerActionsType,
  uiControllerState
} from "./reducers/uiControllerReducer";
import * as React from "react";
import { useRouter } from "next/router";
import { useSafeContext } from "core/hooks";
import { useCategories } from "services/product";

const initialState = {
  openAddressModal: false,
  dispatch: () => {},
  setProgress: () => {},
  categories: [],
  progress: 0,
};

export const [useUIController, Provider] = useSafeContext<uiControllerState>({})

export const UIControllerProvider: FC = ({ children }) => {
  const [controller, dispatch] = useReducer<Reducer<uiControllerState, uiControllerActions>>(reducer, initialState);
  const { categories } = useCategories();
  const [progress, setProgress] = useState(0)
  const [recentlyViewedProduct, setRecentlyViewedProduct] = useState([])
  const router = useRouter();

  const closeDrawerModal = () => {
    dispatch({ type: uiControllerActionsType.CLOSE_DRAWER_MODAL })
  }

  // React.useEffect(() => {
  //
  //   // setTimeout(() => {
  //   // setIsPreloaded(true);
  //   document.body.classList.add('fade-in-page');
  //   // }, 200);
  //   // setTimeout(() => {
  //   //   setIsPreloaded(true);
  //   // }, 200);
  //   return () => document.body.classList.remove('fade-in-page');
  // }, [router.asPath]);

  return (
    <Provider
      value={{
        ...(controller as object), dispatch, categories,
        closeDrawerModal, recentlyViewedProduct,
        progress, setProgress,
      }}
    >
      {children}
    </Provider>
  );
}
