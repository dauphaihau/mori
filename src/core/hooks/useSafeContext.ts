import React from 'react';

export function useSafeContext<TValue extends {} | null>(initialState) {
  const context = React.createContext<TValue | undefined>(initialState);

  const useContext = () => {
    const value = React.useContext(context);
    if (value === undefined) {
      throw new Error('useContext must be inside a Provider with a value');
    }
    return value;
  }

  return [useContext, context.Provider] as const;
}
