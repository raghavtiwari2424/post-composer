import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("pc_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("pc_token", data.token);
    localStorage.setItem("pc_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function register(email, password) {
    await api.post("/auth/register", { email, password });
    return login(email, password);
  }

  function logout() {
    localStorage.removeItem("pc_token");
    localStorage.removeItem("pc_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
