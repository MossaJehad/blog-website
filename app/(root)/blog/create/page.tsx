import { auth } from '@/auth';
import BlogForm from '@/components/BlogForm'
import { redirect } from 'next/navigation';

const page = async () => {

    const session = await auth();
    if (!session) redirect('/');

  return (
    <>
        <section className='blue_container !min-h-[230px]'>
            <h1 className='heading'>
                Submit Your Blog
            </h1>
            <BlogForm />
        </section>
    </>
  )
}

export default page