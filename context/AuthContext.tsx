"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const STORAGE_KEY = "sandystrendywear_auth";

type AuthContextType = any;
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (err) {
        if (typeof window !== "undefined")
          window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, token]);

  const saveAuth = (payload: any) => {
    setError(null);
    setUser(payload.user);
    setToken(payload.token);
    setStatus("idle");
  };

  const callAuthEndpoint = async (path: string, body: any) => {
    setStatus("loading");
    setError(null);
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok) {
      setStatus("error");
      setError(payload.message || "Authentication failed");
      throw new Error(payload.message || "Authentication failed");
    }
    saveAuth(payload);
    return payload;
  };

  const login = (email: string, password: string) =>
    callAuthEndpoint("/api/auth/login", { email, password });
  const register = (name: string, email: string, password: string) =>
    callAuthEndpoint("/api/auth/register", { name, email, password });
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    setStatus("idle");
    if (typeof window !== "undefined")
      window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      error,
      isLoggedIn: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
    }),
    [user, token, status, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
