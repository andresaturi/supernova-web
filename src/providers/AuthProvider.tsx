import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { login as loginRequest } from "@/features/auth/api/login";
import { me } from "@/features/auth/api/me";
import type { User } from "@/features/auth/types/auth";
import { tokenStorage } from "@/lib/token";
import { registerLogout } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login(email: string, password: string): Promise<User>;
  logout(): void;
  refreshUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  

  async function login(email: string, password: string) {
    const response = await loginRequest(email, password);

    tokenStorage.set(
      response.access,
      response.refresh
    );

    setUser(response.user);

    return response.user;
  }

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
    window.location.replace("/login");
  };

  async function loadUser() {    

    try {
      if (!tokenStorage.getAccess()) {
        setLoading(false);
        return;
      }

      const user = await me();

      setUser(user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }

  async function refreshUser() {
    await loadUser();
  }

  useEffect(() => {
    loadUser();
  }, []);


useEffect(() => {
    registerLogout(logout);
}, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refreshUser,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro do AuthProvider."
    );
  }

  return context;
}
