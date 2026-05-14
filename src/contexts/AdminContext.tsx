import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const SESSION_KEY = "ic_admin_session";
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID as string;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface AdminContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (id: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  session: { user: { email: string; last_sign_in_at: string } } | null;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === "true") setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = async (id: string, password: string): Promise<{ error?: string }> => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      return {};
    }
    return { error: "Invalid ID or password" };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  const session = isAuthenticated
    ? { user: { email: ADMIN_ID, last_sign_in_at: new Date().toISOString() } }
    : null;

  return (
    <AdminContext.Provider value={{ isAuthenticated, loading, login, logout, session }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
