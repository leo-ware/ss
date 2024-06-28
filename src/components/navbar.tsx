import Link from "@/components/link"
import { createClient } from "@/lib/supabase/server"

const Navbar = async () => {
    const supabase = createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    return (
        <div className="col-start-8 col-span-3 h-full flex items-center justify-between">
            <Link href="/search">
                Search
            </Link>
            
            {user
                ? <>
                    <Link href="/projects">
                        Projects
                    </Link>
                    <Link href="/profile">
                        Profile
                    </Link>
                    <Link href="/auth/signout">
                        Sign Out
                    </Link>
                </>
                : <Link href="/login">Login</Link>}
        </div>
    )
}

export default Navbar