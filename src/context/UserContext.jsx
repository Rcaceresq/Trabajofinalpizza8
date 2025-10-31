import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../services/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : { token: null, email: null };
    } catch {
      return { token: null, email: null };
    }
  });
  const [profile, setProfile] = useState(null);
  const isAuthenticated = Boolean(auth?.token);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth || { token: null, email: null }));
  }, [auth]);

  const login = async ({ email, password }) => {
    const data = await apiFetch("/api/auth/login", { method: "POST", body: { email, password } });
    setAuth({ token: data?.token, email: data?.email || email });
    return data;
  };

  const register = async ({ email, password }) => {
    const data = await apiFetch("/api/auth/register", { method: "POST", body: { email, password } });
    setAuth({ token: data?.token, email: data?.email || email });
    return data;
  };

  const logout = () => {
    setAuth({ token: null, email: null });
    setProfile(null);
  };

  const fetchMe = async () => {
    const data = await apiFetch("/api/auth/me");
    setProfile(data);
    if (data?.email && auth?.email !== data.email) {
      setAuth((p) => ({ ...(p || {}), email: data.email }));
    }
    return data;
  };

  const value = useMemo(() => ({
    token: auth?.token,
    email: auth?.email,
    isAuthenticated,
    profile,
    login,
    register,
    logout,
    fetchMe
  }), [auth, isAuthenticated, profile]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
