'use client';

import { useAuth } from '@/context/authContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PostFeed } from '@/components/postFeed';
import { dummyPosts, Post } from '@/components/models/models';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAPI } from '@/hooks/useAPI';


export default function ProfilePage() {

    const auth = useAuth();
    const api = useAPI();
    const path = usePathname();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>(dummyPosts);
    const [postVal, setPostVal] = useState('');

    useLayoutEffect(() => {
        if (!auth.token) {
            router.push(`/login?next=${path}`);
        }
    }, []);

    if (auth.token === undefined) {
        return null;
    }

    const onNewPost = async () => {
        //make api call
        const result = await api.call<{ msg: string, post: Post }>('/profile/new-post', 'POST', { post: postVal });

        if (result) {
            setPosts((state) => {
                return [result.post, ...state];
            });
        }else{
            console.log('Err creating new post')
        }

    };

    return (
        <div className="flex flex-col w-full items-center gap-20">
            <PostFeed posts={posts}></PostFeed>
            <div className="w-3/4 flex flex-col  gap-2">
                <Textarea placeholder="Type your message here." className="" value={postVal}
                          onChange={(e) => setPostVal(e.target.value)}/>
                <Button className="w-1/6" onClick={onNewPost}>Post</Button>
            </div>
        </div>);


}