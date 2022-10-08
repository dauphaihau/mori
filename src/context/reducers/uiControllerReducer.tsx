import { Reducer } from "react";

export enum uiControllerActionsType {
  OPEN_ADDRESS_MODAL = 'OPEN_ADDRESS_MODAL',
  CLOSE_DRAWER_MODAL = 'CLOSE_DRAWER_MODAL',
}

export interface uiControllerActions {
  type: uiControllerActionsType;
  payload?: any,
  // dispatch: (p: {type: string}) => object
}

export interface uiControllerState {
  openAddressModal: boolean,
  categories: [],
  progress: number,
  setProgress: (progress) => void
  setCategories: (categories) => void
  dispatch: (p: {type: string}) => object
}

const uiControllerReducer: Reducer<uiControllerState, uiControllerActions> = (state, action) => {
// const uiControllerReducer = (state: uiControllerState | Error, action: uiControllerActions) => {

  const { type, payload } = action
  switch (type) {
    case uiControllerActionsType.OPEN_ADDRESS_MODAL: {
      return { ...state, openAddressModal: true };
    }

    case uiControllerActionsType.CLOSE_DRAWER_MODAL: {
      return {
        ...state,
        openAddressModal: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

export default uiControllerReducer