import { redirect } from "next/navigation"


const Page = () => {
    return redirect("/api/auth/signin")
}

export default Page