"use client";

import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/actions";

const BlogForm = () => {

  const [errs, setErrs] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            tag: formData.get('tag') as string,
            link: formData.get('link') as string,
            text,
        }

        await formSchema.parseAsync(formValues);
        const res = await createBlog(prevState, formData, text);

        if(res.status === 200) {
            toast({
                title: "Success",
                description: "Blog created successfully",
            });
            router.push(`/blog/${res._id}`);
        }
        

    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            setErrs(fieldErrors as unknown as Record<string, string>);
            
            toast({
                title: "Error",
                description: "Please check the form fields",
                variant: "destructive",
            })
            
            return {...prevState, error: "Invalid form data", status: "ERROR"};
        }
        toast({
            title: "Error",
            description: "An unexpected error has occured",
            variant: "destructive",
        });
        return {...prevState, error: "An unexpected error has occured", status: "ERROR"};
    }
  }
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});
  
  return (
    <form action={formAction} className='blog-form'>
        <div>
            <label htmlFor='title' className="blog-form_label">Title</label>
            <Input id='title' name="title" className="blog-form_input" required placeholder="Blog Title" />
            {errs.title && <p className="blog-form_error">{errs.title}</p>}
        </div>
        <div>
            <label htmlFor='description' className="blog-form_label">Description</label>
            <Textarea id='description' name="description" className="blog-form_textarea" required placeholder="Blog Description" />
            {errs.description && <p className="blog-form_error">{errs.description}</p>}
        </div>
        <div>
            <label htmlFor='tag' className="blog-form_label">Tag</label>
            <Input id='tag' name="tag" className="blog-form_input" required placeholder="Blog Tag" />
            {errs.tag && <p className="blog-form_error">{errs.tag}</p>}
        </div>
        <div>
            <label htmlFor='link' className="blog-form_label">Image URL</label>
            <Input id='link' name="link" className="blog-form_input" required placeholder="Blog Image URL" />
            {errs.link && <p className="blog-form_error">{errs.link}</p>}
        </div>
        <div data-color-mode="light" >
            <label htmlFor='text' className="blog-form_label">Blog Text</label>
            <MDEditor value={text} onChange={(value) => setText(value as string)} id="text" preview="edit" height={300} style={{borderRadius: 20, overflow: "hidden"}} textareaProps={{placeholder: 'Briefly describe your ideas'}} previewOptions={{disallowedElements: ["style"]}} />
            {errs.text && <p className="blog-form_error">{errs.text}</p>}
        </div>
        <Button disabled={isPending} type="submit" className="blog-form_btn text-white">{isPending ? 'Submitting...' : 'Submit Blog'}
            <SendIcon className="size-6 ml-2" />
        </Button>
    </form>
  )
}

export default BlogForm