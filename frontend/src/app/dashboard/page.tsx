'use client';
import { useAPI } from '@/hooks/useAPI';
import { useEffect, useState } from 'react';
import { ApiService } from '@/app/services/api-service';


export interface Post {
    id: number,
    title: string,
    description: string,
}


export default function DashboardPage() {

    // const posts = await ApiService.get<{ posts: Post[] }>('/profile/posts');
    // console.log(posts);
    const api = useAPI();

    const [posts, setPosts] = useState<Post[]>([]);


    useEffect(() => {

        const getPosts = async () => {
            const posts = await api.call<{ posts: Post[] }>('/profile/posts', 'GET');
            console.log(posts);
            setPosts(posts?.posts || []);
        };
        console.log('Getting posts now mah dude');
        getPosts();
    }, []);

    return (

        <div className="bg-amber-400">
            <div>
                {posts?.map(p => {
                    return (
                        <div key={p.id}>
                            <h1>{p.title}</h1>
                            <p>{p.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>)
        ;
}
