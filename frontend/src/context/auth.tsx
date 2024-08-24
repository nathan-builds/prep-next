'use client';
import { createContext, ReactNode, useState } from 'react';
import { ReactComponentLike } from 'prop-types';


export interface AuthProps {
    children: ReactNode;
}

export interface Auth {
    name: string | undefined,
    email: string | undefined,
    isLoggedIn: boolean,
    setIsLoggedIn: (val: boolean) => void,
    setName: (val: string) => void,
    setEmail: (val: string) => void

}

export const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    return (
        <AuthContext.Provider value={{
            name,
            email,
            isLoggedIn,
            setIsLoggedIn,
            setName,
            setEmail
        }}>
            {children}
        </AuthContext.Provider>);
};