import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('brofit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    // Get existing users or create empty array
    const existingUsers = JSON.parse(localStorage.getItem('brofit_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    // Save to users list
    existingUsers.push(newUser);
    localStorage.setItem('brofit_users', JSON.stringify(existingUsers));

    // Log in the new user (without password in state)
    const userForState = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userForState);
    localStorage.setItem('brofit_user', JSON.stringify(userForState));

    return { success: true, message: 'Registration successful' };
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('brofit_users') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userForState = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(userForState);
      localStorage.setItem('brofit_user', JSON.stringify(userForState));
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brofit_user');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
