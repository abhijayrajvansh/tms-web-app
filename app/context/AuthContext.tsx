'use client';

import React, { createContext, useContext } from 'react';
import type { Models } from 'appwrite';

type User = Models.User<{}> | null;

const AuthContext = createContext<{ user: User }>({
  user: null,
});

export const AuthProvider = ({ user, children }: { user: User; children: React.ReactNode }) => {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
