import React from 'react';

function createSafeContext<TValue extends {} | null>(initialState) {
  const context = React.createContext<TValue | undefined>(initialState);

  function useContext() {
    const value = React.useContext(context);
    if (value === undefined) {
      throw new Error('useContext must be inside a Provider with a value');
    }
    return value;
  }

  return [useContext, context.Provider] as const;
}

export default createSafeContext;