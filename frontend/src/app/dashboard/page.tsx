'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const { email, isLoggedIn } = useAuth();
    const router = useRouter();
    return (

        <div className="bg-amber-400">
            Dashboard Page
        </div>);
}
