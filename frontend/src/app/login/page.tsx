'use client';
import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [pWord, setPword] = useState('');
    const { next } = useSearchParams();
    const auth = useAuth();
    const router = useRouter();

    const onSubmit = () => {
        auth?.setName('Nate');
        auth?.setEmail('hey');
        auth?.setIsLoggedIn(true);
        console.log(next);
        router.push(next || '/profile');
    };

    return (
        <div className="flex justify-center mt-20">
            <Card className="w-1/2 ">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to awesome app</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Input value={email} placeholder={'Enter email'} className=""
                           onChange={(event) => setEmail(event.target.value)}></Input>
                    <Input value={pWord} placeholder={'Enter email'} className=""
                           onChange={(event) => setPword(event.target.value)}></Input>
                    <Button onClick={onSubmit}>Submit</Button>
                </CardContent>


                {/*<CardFooter>*/}
                {/*    <p>Card Footer</p>*/}
                {/*</CardFooter>*/}
            </Card>
        </div>);
}


