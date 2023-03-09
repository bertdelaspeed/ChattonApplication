import { createContext, useState } from "react";

export const AuthenticatedUserContext = createContext();

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState("Resusoft");
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default AuthenticatedUserProvider;
