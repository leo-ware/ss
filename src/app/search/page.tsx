import InputText from "@/components/inputText"
import BigButton from "@/components/bigButton"
import Radio from "@/components/radio"

import { createProject, getProjects } from "@/api/projects"
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

const Page = async () => {
    const projects = await getProjects()
    const newOption: any = { name: "New", value: "new" , className: "font-bold" }
    const options = projects.map(p => ({ name: p.name, value: p.id.toString() }))

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
                    <div className="h-10 flex items-center justify-end">
                        <label className="text-md">Project:</label>
                    </div>
                    <div className="w-2"/>
                    <Radio
                        name="projectId"
                        initSelected={newOption}
                        options={[newOption].concat(options)} />
                </div>
            </form>
        </div>
    )
}

export default Page