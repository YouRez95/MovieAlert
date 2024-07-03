import { createContext, useContext, useLayoutEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  isVerified: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const storedUer = localStorage.getItem("user");
    if (storedUer) {
      setUser(JSON.parse(storedUer));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isVerified = () => {
    setUser((prev) => ({
      ...prev,
      verified: true,
    }));
    localStorage.setItem("user", JSON.stringify({ ...user, verified: true }));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isVerified }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
