import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"
import Tabs from "@/components/tabs"
import { FiEdit2 } from "react-icons/fi"


export default async ({ params }: { params: { userId: string } }) => {
    const client = createClient()
    const { data: { user }, error: authError } = await client.auth.getUser()

    const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", params.userId)
        .single()
    
    const tabNames = ["Projects", "Papers", "Topics", "Info"]
    const imgUrl: string | null = null

    return (
        <div className="col-span-6 col-start-3 row-span-7 row-start-1 grid grid-rows-subgrid">
            <div className="row-span-2 w-full flex flex-row items-center justify-center">
                <div className="w-24 h-24 relative">
                    <div className="w-full h-full absolute">
                        {imgUrl
                            ? <img className="w-full h-full" />
                            : <div className="w-full h-full bg-gray-100 text-sm text-gray-400">
                                no image
                              </div>}
                    </div>
                    
                    <div className="absolute w-full h-full">
                        <FiEdit2 className="absolute right-2 top-2" />
                    </div>
                </div>
                <div className="w-4" />
                <div className="w-36">
                    <div className="font-bold text-lg max-w-40 break-words">
                        {data?.firstName || "" + " " + data?.lastName}
                    </div>
                    <div>
                        {data?.affiliation || "affiliation"}
                    </div>
                </div>
            </div>

            <div className="row-span-5 w-full">
                <Tabs
                    className="w-full h-full"
                    tabs={[
                        {
                            name: "Projects",
                            page: "Projects"
                        },
                        {
                            name: "Papers",
                            page: "Papers"
                        },
                        {
                            name: "Topics",
                            page: "Topics"
                        },
                        {
                            name: "Info",
                            page: "Info"
                        },
                    ]}/>
            </div>
        </div>
    )
}