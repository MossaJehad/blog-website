import { z } from 'zod';

export const formSchema = z.object({

    title: z.string().min(3).max(100).nonempty('Title is required'),
    
    description: z.string().min(20).max(500).nonempty('Body is required'),
    
    tag: z.string().min(3).max(25).nonempty('Tag is required'),
    
    link: z.string().url().refine( async (url) => {
        try {
            const res = await fetch(url, {method: 'HEAD'});
            const contentType = res.headers.get('content-type');
            return (contentType?.startsWith('image/'));
        } catch {
            return false;
        }
    }),
    text : z.string().min(50).nonempty('Text is required')
});