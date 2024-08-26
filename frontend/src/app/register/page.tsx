'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useAPI } from '@/hooks/useAPI';


export default function RegisterPage() {
    const api = useAPI();

    const formSchema = z.object({
        username: z.string().min(10, {
            message: 'Username is too short must be 10 characters'
        }),
        email: z.string().email({
            message: 'Invalid email,please enter  a correct one dawg.'
        })
    });

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: { username: '', email: '' }
        }
    );

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        api.call('/register/user', 'POST', data).then(res => {
            console.log(res);
        });
    };


    return (
        <div className={'flex justify-center mt-20'}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 ">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField name={'email'} control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>

                    )}
                    />
                    <Button type="submit" className={'mt-2'}>Submit</Button>
                </form>
            </Form></div>


    );
}