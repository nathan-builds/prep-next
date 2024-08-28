'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Auth = {
    username: string | undefined,
    token: string | undefined
    setToken: (token: string) => void
    setUsername: (username: string) => void


}

export const AuthContext = createContext<Auth>({
    username: undefined,
    token: undefined,
    setToken: () => {
    },
    setUsername: () => {
    }

});

export const useAuth = () => {
    const auth = useContext(AuthContext);

    return auth;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
            if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                setToken(token as string);
            }
        }
        , []);

    return (
        <AuthContext.Provider value={{
            username,
            token,
            setToken,
            setUsername
        }}>
            {children}
        </AuthContext.Provider>
    );
};