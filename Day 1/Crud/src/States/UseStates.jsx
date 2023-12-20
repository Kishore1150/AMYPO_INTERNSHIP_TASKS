import React, { createContext, useContext, useState } from "react";

const userContext = createContext();
const showexpenseContext = createContext();

export function useUser() {
  return useContext(userContext);
}

export function useShowExpense() {
  return useContext(showexpenseContext);
}

export function UseStates({ children }) {
  const [user, setUser] = useState({});
  const [showexpense, setShowexpense] = useState([]);

  function updateShowExpense(newcampaign) {
    setShowexpense(newcampaign);
  }

  function updateUser(newuser) {
    setUser(newuser);
  }

  const showexpenseContextValue = {
    showexpense,
    updateShowExpense,
  };
  const userContextValue = {
    user,
    updateUser,
  };

  return (
    <userContext.Provider value={userContextValue}>
      <showexpenseContext.Provider value={showexpenseContextValue}>
        {children}
      </showexpenseContext.Provider>
    </userContext.Provider>
  );
}
