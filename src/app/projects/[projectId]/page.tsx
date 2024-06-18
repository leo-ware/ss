"use client"

import useSWR from "swr"
import { getProject, updateProjectFormAction } from "@/api/projects"
import SmoothInput from "@/components/smoothInput"
import Link from "next/link"


const Page = ({params}: {params: {projectId: string}}) => {
    const projectId = params.projectId
    const { data, error, isLoading, mutate } = useSWR(projectId, getProject)

    return (
        <div className="col-span-10 row-span-7 grid grid-cols-subgrid grid-rows-subgrid">
            <div className="row-span-1 col-span-10 w-full h-full flex items-center justify-center">
                <SmoothInput
                    value={data?.name || ""}
                    name="name"
                    data={{id: projectId}}
                    placeholder="Project Title"
                    disabled={isLoading}
                    action={updateProjectFormAction}
                    onSave={mutate}
                    className="text-3xl font-bold min-w-fit p-2 text-center"
                    />
            </div>

            <div className="row-span-1 col-span-6 col-start-3">
                <SmoothInput
                    className="w-full min-h-12 p-2"
                    value={data?.description || ""}
                    name="description"
                    data={{id: projectId}}
                    disabled={isLoading}
                    placeholder="no description"
                    action={updateProjectFormAction}
                    onSave={mutate}/>
            </div>

            <div className="row-span-5 col-span-6 col-start-3">
                <div>
                    <Link href={`/projects/${data?.id}/search`}>Papers</Link>

                </div>
            </div>

            <div className="row-span-5 col-span-10">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {JSON.stringify(error)}</p>}
            </div>
        </div>
    )
}

export default Page