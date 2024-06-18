"use client"

import { getProjects, createProjectFormAction, deleteProjectFormAction, createProject } from "@/api/projects"
import TimeSince from "@/components/timeSince"
import Link from "next/link"
import useSWR from "swr"
import { FiChevronsDown, FiChevronsUp, FiTrash2 } from "react-icons/fi"
import { SelectProject } from "@/db/schema"
import { useState } from "react"

const ProjectWidget = ({ project, mutate }: { project: SelectProject, mutate: () => void }) => {
    // const [open, setOpen] = useState(false)

    return (
        <div className="mb-4 p-4 border border-black rounded h-24 flex flex-row justify-between">
            <div className="flex flex-col justify-between">
                <div className="font-bold text-lg hover:text-gray-600 hover:underline">
                    <Link href={`/projects/${project.id}`}>
                        {project.name}
                    </Link>
                </div>
                <div className="text-xs text-gray-600">
                    Edited <TimeSince date={project.lastUpdated} />
                </div>
                <div className="text-sm">{project.description}</div>
            </div>

            <div className="flex flex-col justify-between">
                <form action={deleteProjectFormAction} onSubmit={() => setTimeout(mutate, 500)}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit">
                        <FiTrash2 />
                    </button>
                </form>
                <div>
                    {/* {open
                        ? <FiChevronsUp onClick={() => setOpen(false)} />
                        : <FiChevronsDown onClick={() => setOpen(true)} />} */}
                </div>
            </div>

        </div >
    )
}

const Projects = () => {
    const { data, isLoading, error, mutate } = useSWR("projects", getProjects)
    const sortedProjects = data?.sort((a, b) =>
        (new Date(a.lastUpdated) > new Date(b.lastUpdated) ? -1 : 1))

    return (
        <div className="col-span-8 col-start-2 row-span-7 grid grid-rows-subgrid grid-cols-subgrid ">
            <div className="row-span-7 col-span-6">
                {isLoading && <div>Loading...</div>}
                {error && <div>{JSON.stringify(error)}</div>}
                {sortedProjects?.map(project => (
                    <ProjectWidget key={project.id} project={project} mutate={mutate} />
                ))}
            </div>

            <div className="col-span-2 row-span-7">
                <form action={createProjectFormAction} onSubmit={() => setTimeout(mutate, 500)}>
                    <input type="hidden" name="name" value="test" />
                    <button
                        type="submit"
                        className="border border-black p-2 rounded">
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Projects