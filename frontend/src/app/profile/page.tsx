'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

export default function ProfilePage() {

    const { isLoggedIn } = useAuth();
    const path = usePathname();
    const router = useRouter();
    useLayoutEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login?next=${path}`);
        }
    }, []);
    if (isLoggedIn === undefined) {
        return null;
    }

    return (
        <div className="bg-amber-400">
            Profile Page
        </div>);

}