"use server"

import { addPaperToProject, addSearchToProject } from "@/api/projects"
import { InsertPaper } from "@/db/schema"
import { searchFormAction } from "@/ss/actions"

export const saveFormHandler = async (formData: FormData) => {
    const projectId = parseInt(formData.get("projectId") as string)
    // const paperId = formData.get("paperId")
    const paper = JSON.parse(formData.get("paperData") as string || "{}") as InsertPaper

    if (!paper || !projectId) {
        throw new Error("Missing projectId or paper")
    }

    return addPaperToProject(projectId, paper)
}

export const searchHandler = async (_:any, formData: FormData) => {

    
    const projectId = parseInt(formData.get("projectId") as string)
    if (projectId) {
        formData.delete("projectId")
        console.log(await addSearchToProject(projectId, formData.get("query") as string))
    } else {
        console.warn("search not logged")
    }
    const ssResult = await searchFormAction(null, formData)
    return ssResult
}