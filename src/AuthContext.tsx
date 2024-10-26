import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoggedIn: boolean;
  role: string | null;
  email: string | null;
  username: string | null;
  login: (token: string, role: string, email: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const login = (
    token: string,
    userRole: string,
    userEmail: string,
    userUsername: string
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("username", userUsername);
    setIsAuthenticated(true);
    setIsLoggedIn(true);
    setRole(userRole);
    setEmail(userEmail);
    setUsername(userUsername);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setIsLoggedIn(false);
    setRole(null);
    setEmail(null);
    setUsername(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(true);
      setIsLoggedIn(true);
      setRole(storedRole);
      setEmail(storedEmail);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoggedIn,
        role,
        email,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
