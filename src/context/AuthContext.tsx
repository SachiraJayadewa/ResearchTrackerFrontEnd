import React, { createContext, useState, useEffect } from "react";


interface User {
  sub: string;  // Username
  role: string; // Role (ADMIN, MEMBER, etc.)
  id?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: string | null; 
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        
        setUser({
          sub: payload.sub, // Username usually stored here
          role: payload.role || (payload.authorities ? payload.authorities[0] : "MEMBER"),
          id: payload.id
        });
      } catch (e) {
        console.error("Invalid token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Calculate derived state
  const isAuthenticated = !!user;
  const role = user?.role || null; 

  return (
    <AuthContext.Provider value={{ token, user, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};