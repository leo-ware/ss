import {createClient} from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async () => {
    const client = createClient()
    const { error } = await client.auth.signOut()

    if (error) {
        console.log(error)
    }
    
    return (
        <div>
            You are signed out
        </div>
    )
}
