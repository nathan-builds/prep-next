'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const auth = useContext(AuthContext);
    const router = useRouter();
    return (

        auth?.email ?
            <div className="bg-amber-400">
                Dashboard Page
            </div> : router.push('/login'));
}
