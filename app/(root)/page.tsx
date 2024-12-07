import { auth } from "@/auth";
import BlogCard, {BlogTypeCard} from "@/components/BlogCard";
import SearchForm from "@/components/SearchForm";
import { BLOG_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  const { data: posts } = await sanityFetch({query: BLOG_QUERY, params});

  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Welcome to WeBlog!
        </h1>
        <br />
        <p className="sub-heading !max-w-3xl">
          A blogging website where you can create
          your own blog posts and share them with the world.
        </p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : 'Latest Blogs'} 
          </p>

          <ul className="mt-7 card_grid">
                {posts?.length > 0 ? (
                  posts.map((post: BlogTypeCard) => (
                    <BlogCard key={post?._id} post={post} />
                ))
                ) : (
                  <p className="no-results">No blogs found</p>
                )}
          </ul>

      </section>
      <SanityLive />
    </div>
  );
}
