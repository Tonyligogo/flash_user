import { useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token:string, user:User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  // Restore session on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        const storedUser = await SecureStore.getItemAsync("authUser");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = async (token: string, user: User) => {
    await SecureStore.setItemAsync("authToken", token);
    await SecureStore.setItemAsync("authUser", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  // Logout
  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("authUser");

    queryClient.clear(); // Clears all cached API data

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
