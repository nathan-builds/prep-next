import { Post } from '@/components/models/models';
import { Card } from './ui/card';

export interface PostFeedProps {
    posts: Post[];
}


export const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {

    return (
        <div className="flex flex-col gap-2">
            {posts.map((p, index) => {
                return (
                    <Card key={index} className='h-12 flex items-center'>
                        <div>{p.text}</div>
                    </Card>);
            })}
        </div>
    );
};