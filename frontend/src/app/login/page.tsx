'use client';
import React, { useContext, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAPI } from '@/hooks/useAPI';
import { useAuth } from '@/context/authContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [pWord, setPword] = useState('');
    // const { next } = useSearchParams();
    const api = useAPI();
    const auth = useAuth();

    const formSchema = z.object({
        username: z.string().min(5).max(10),
        password: z.string().min(2).max(20)
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const token = await api.call<{ token: string }>('/auth/login', 'POST', data);
        if (!token) {
            console.log('No token');
            return;
        }
        auth.setToken(token.token);
        localStorage.setItem('token', token.token);


    };


    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                username: '',
                password: ''
            }
        }
    );


    return (
        <div className={'flex w-full items-center justify-center mt-20'}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
                    <FormField control={form.control} name={'username'} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username </FormLabel>
                            <FormControl>
                                <Input placeholder={'username...'} {...field}></Input>

                            </FormControl>
                            <FormDescription></FormDescription>
                        </FormItem>
                    )}>
                    </FormField>
                    <FormField control={form.control} name={'password'} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password </FormLabel>
                            <FormControl>
                                <Input placeholder={'password..'} {...field} type={'password'}></Input>
                            </FormControl>
                            <FormDescription></FormDescription>
                        </FormItem>
                    )}>

                    </FormField>
                    <Button type={'submit'}>Login</Button>
                </form>

            </Form>
        </div>

    );
}


