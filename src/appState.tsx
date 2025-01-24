// @ts-nocheck
import React, {createContext, useContext, useState} from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({children}) => {
  const [address, setAddress] = useState('');

  return (
    <AppStateContext.Provider value={{address, setAddress}}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
