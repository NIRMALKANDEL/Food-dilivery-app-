import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const SESSION_STORAGE_KEY = "nibblr-session";

const loadSession = () => {
  try {
    const saved = localStorage.getItem(SESSION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    return null;
  }
};

// Demo-only auth: this app has no backend, so "logging in" means the
// email/password only pass client-side format validation (see Login.jsx) —
// nothing is checked against a real credential store, and no password is
// ever persisted. A local session is created purely so the rest of the UI
// (checkout, orders, favorites) has something to gate on.
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(loadSession);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (err) {
      // localStorage unavailable — session just won't survive a reload.
    }
  }, [user]);

  const login = (email, name) => {
    const session = {
      email,
      name: name?.trim() || email.split("@")[0],
      token: crypto.randomUUID(),
      loggedInAt: new Date().toISOString(),
    };
    setUser(session);
    return session;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default UserContext;
