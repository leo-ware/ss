import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const Page = async () => {
    const client = createClient()
    const userId = (await client.auth.getUser()).data.user?.id

    if (userId) {
        return redirect(`/profile/${userId}`)
    } else {
        return redirect("/")
    }
}

export default Page