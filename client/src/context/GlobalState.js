import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  typeOfTransaction: ''
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setTransactionType(type) {
    dispatch({
      type: 'TRANSACTION_TYPE',
      payload: type
    });
  }

  return (<GlobalContext.Provider value={{
    typeOfTransaction: state.typeOfTransaction,
    setTransactionType
  }}>
    {children}
  </GlobalContext.Provider>);
}