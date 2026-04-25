import { createContext, useContext, useEffect, useState } from "react";
import { adminApi } from "@/services/api";

interface AuthContextValue {
  user: any | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => void;
  signIn: (credentials: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAdmin: false,
  signOut: () => {},
  signIn: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const userData = await adminApi.getMe();
      setUser(userData);
      setIsAdmin(userData.role === 'admin' || userData.role === 'super_admin');
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (credentials: any) => {
    const data = await adminApi.login(credentials);
    localStorage.setItem('token', data.access_token);
    await checkAuth();
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
