import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiLogin } from "@/lib/api";

const TOKEN_KEY = "ic_admin_token";

interface AdminContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  login: (id: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  session: { user: { email: string; last_sign_in_at: string } } | null;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) {
      setToken(saved);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (id: string, password: string): Promise<{ error?: string }> => {
    try {
      const jwt = await apiLogin(id, password);
      sessionStorage.setItem(TOKEN_KEY, jwt);
      setToken(jwt);
      setIsAuthenticated(true);
      return {};
    } catch {
      return { error: "Invalid ID or password" };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsAuthenticated(false);
  };

  const session = isAuthenticated
    ? { user: { email: "admin", last_sign_in_at: new Date().toISOString() } }
    : null;

  return (
    <AdminContext.Provider value={{ isAuthenticated, loading, token, login, logout, session }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
