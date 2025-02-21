"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile: any | null;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  setAuthState: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchProfile();
    }
  }, []);

  const setAuthState = async (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    await fetchProfile();
  };

  const fetchProfile = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;

      const response = await axios.get(
        "https://infinitum-website.onrender.com/api/student/profile/",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://infinitum-website.onrender.com/api/auth/logout"
      );
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
      setUserProfile(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        userProfile,
        logout,
        fetchProfile,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
