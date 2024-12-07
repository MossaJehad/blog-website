/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Blog, Author } from '@/sanity/types'

export type BlogTypeCard = Omit<Blog, "author"> & {author?: Author}

const BlogCard = ({post}: {post: BlogTypeCard}) => {
  
    const {
      _createdAt,
      views,
      author,
      title,
      tag,
      _id,
      image,
      description,
    } = post;

    return (
    <li className='blog-card group'>
        <div className='flex-between'>
            <p className='blog_card_date'>{formatDate(_createdAt)}</p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-meduim line-clamp-1'>
                        {author?.name}
                    </p>
                </Link>
                <Link href={`/blog/${_id}`}>
                    <h3 className='text-26-semibold line-clamp-1'>
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={`https://placehold.co/48x48`} alt={`placeholder`} width={48} height={48} className='rounded-full'/>
            </Link>
        </div>
        <Link href={`/blog/${_id}`}>
            <p className='blog-card_desc'>
                {description}
            </p>
            <img src={image} alt="placeholder" className='blog-card_img'/>
        </Link>
        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${tag?.toLowerCase()}`}>
                <p className='text-16-medium'>
                    {tag}
                </p>
            </Link>
            <Button className="blog-card_btn" asChild>
                <Link href={`/blog/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}

export default BlogCard