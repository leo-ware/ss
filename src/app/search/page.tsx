import InputText from "@/components/inputText"
import BigButton from "@/components/bigButton"
import Radio from "@/components/radio"
import { FiPlus } from "react-icons/fi"

import { createProject, getProjects } from "@/lib/functions/projects"
import { redirect } from "next/navigation"

const action = async (formData: FormData) => {
    "use server"
    
    const projectIdSubmitted = formData.get("projectId")
    const query = formData.get("query")

    const projectId = projectIdSubmitted === "new"
        ? (await createProject({ name: "unnamed" }))[0].id.toString()
        : projectIdSubmitted
    
    return redirect(`/projects/${projectId}?query=${query}`)
}

export default async () => {
    const projects = await getProjects()
    const options: any = { new: (
        <div className="w-full h-full px-2 flex items-center justify-between border-bottom border-gray-600">
            New <FiPlus strokeWidth={3}/>
        </div>
    )}
    projects.forEach(p => {
        options[p.id.toString()] = <div>{p.name}</div>
    })

    return (
        <div className="col-span-10 row-span-6 flex justify-center items-center">
            <form className="flex flex-col items-center" action={action}>
                <div className="flex flex-row">
                    <InputText name="query" placeholder="Search..." required />
                    <div className="w-2"/>
                    <BigButton type="submit">Go</BigButton>
                </div>
                <div className="h-2"/>

                <div className="flex flex-row h-fit">
                    {/* <div className="h-10 flex items-center justify-end">
                        <label className="text-md">Project:</label>
                    </div>
                    <div className="w-2"/> */}
                    <Radio
                        placeholder="Add to Project..."
                        name="projectId"
                        initSelected={"new"}
                        options={options} />
                </div>
            </form>
        </div>
    )
}