import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  console.log("Navbar is rendering");
  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src="/weblog.svg" alt="WeBlog" width={40} height={40} />
        </Link>
        <div className="flex items-center gap-5 text-black">
            {
              session && session?.user ?
              (
                <>
                  <Link href="/blog/create">
                    <span>Create</span>
                  </Link>
                  <form action={async () => {
                    "use server";
                    await signOut({redirectTo: "/"})
                  }}>
                    <button type="submit">
                      Log out
                    </button>
                  </form>
                  <Link href={`/user/${session?.user?.id}`}>
                    <span>
                      {session?.user?.name}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <form action={async () => {
                    "use server";
                    await signIn('github')
                  }}>
                    <button type="submit">
                      Login
                    </button>
                  </form>
                </>
              )
          }
        </div>
      </nav>
    </div>
  )
}

export default Navbar;