import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import auth from '../../Firebase.init';
import axiosSecure from '../../api/axiosSecure';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

 const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Issue JWT token
        try {
          const response = await axiosSecure.post('/jwt', { email: currentUser.email });
          if (response.data.success) {
            localStorage.setItem('token', response.data.token);
          }
        } catch (error) {
          console.error("Failed to issue JWT token:", error);
        }
      } else {
        // Clear JWT token
        try {
          await axiosSecure.post('/logout');
        } catch (error) {
          console.error("Failed to call logout on backend:", error);
        } finally {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  const updateUser = (data) => updateProfile(auth.currentUser, data);

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false));
  };


  const authData = {
    user,
    loading,
    createUser,
    signIn,
    updateUser,
    logOut,
    setUser,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authData}>
       {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;