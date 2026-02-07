import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => { 

  const [user, setUser] = useState(null);

  const clearUser=()=>
  {
    setUser(null);
  }
  
  const contextValue = {
    user,
    setUser,
    clearUser
  };

  // console.log(user)
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}