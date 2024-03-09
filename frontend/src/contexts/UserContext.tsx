import React, { createContext, useState } from 'react';


export interface UserContextValue {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextValue | null>(null);

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<string>("");

  const value: UserContextValue = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };