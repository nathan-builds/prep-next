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
        }),
        resume: z.instanceof(FileList).optional()
    });

    const form = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
            defaultValues: { username: '', email: '' }
        }
    );

    const fileRef = form.register('resume');

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        api.call('/register/user', 'POST', data).then(res => {
            console.log(res);
        });

        const formData = new FormData();
        if (data.resume) {
            formData.append('resume', data.resume[0]);
            fetch('http://localhost:3001/register/file', {
                method: 'POST',
                body: formData
            }).then(res => res.json()).then(console.log);

        }

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
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel>Resume</FormLabel>
                                <FormControl>
                                    <Input type={'file'} placeholder={'Resume'} {...fileRef}/>
                                    {/*<Input*/}
                                    {/*    {...fieldProps}*/}
                                    {/*    placeholder="Resume"*/}
                                    {/*    type="file"*/}
                                    {/*    accept="image/*, application/pdf"*/}
                                    {/*    onChange={(event) =>*/}
                                    {/*        onChange(event.target.files && event.target.files[0])*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={'mt-2'}>Submit</Button>
                </form>
            </Form></div>


    );
}