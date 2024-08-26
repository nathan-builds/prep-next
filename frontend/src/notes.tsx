'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';


export default function FORMS() {

    const formSchema = z.object({
        username: z.string().min(10, {
            message: 'Username is too short must be 10 characters'
        })
    });

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: { username: '' }
        }
    );
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };
    return (
        <div className={'flex justify-center'}>
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form></div>
    );
}