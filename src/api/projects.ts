"use server"

import { db } from "@/db/db"
import { projects, projectToPaper, papers, searches, InsertProject, insertProjectSchema, InsertPaper } from "@/db/schema"
import { coerce_BADCODE, isEmpty } from "@/utils"
import { eq } from "drizzle-orm"

export const getProjects = async () => {
    return db.query.projects.findMany()
}

export const getProject = async (id: number | string) => {
    const projectId = typeof id === "string" ? parseInt(id) : id
    return db.query.projects.findFirst({
        where: eq(projects.id, projectId),
        with: {
            projectToPaper: {
                with: {
                    paper: {
                        with: {
                            authorToPaper: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export const updateProject = async (id: number, p: Partial<InsertProject>) => {
    for (const key in p) {
        // @ts-ignore
        if (p[key] === undefined || p[key] === null) {
            // @ts-ignore
            delete p[key]
        }
    }
    if (isEmpty(p)) {
        return { id }
    }
    p.lastUpdated = (new Date()).toDateString()
    return db.update(projects).set(p).where(eq(projects.id, id)).returning().execute()
}

export const updateProjectFormAction = async (formData: FormData) => {
    const receivedObj = Object.fromEntries(formData.entries())
    const { id, ...rest } = coerce_BADCODE(insertProjectSchema.partial()).parse(receivedObj)

    if (!id) {
        throw new Error("No project id")
    }
    return updateProject(id, rest)
}

export const createProject = async (p: Omit<InsertProject, "id" | "createdAt" | "lastUpdated">) => {
    const date = (new Date()).toDateString()
    const foo = { lastUpdated: date, createdAt: date, ...p }
    return db.insert(projects).values(foo).returning().execute()
}

export const createProjectFormAction = async (formData: FormData) => {
    const name = formData.get("name") || "unnamed"
    return createProject({ name: name.toString() })
}

export const deleteProject = async (id: number) => {
    return db.delete(projects).where(eq(projects.id, id)).returning().execute()
}

export const deleteProjectFormAction = async (formData: FormData) => {
    const id = formData.get("id")
    if (!id) {
        throw new Error("No project id")
    }
    return deleteProject(parseInt(id.toString()))
}

export const addExistingPaperToProject = async (projectId: number, paperId: string) => {
    return db.insert(projectToPaper).values({
        projectId,
        paperId
    }).returning().execute()
}

export const addPaperToProject = async (projectId: number, paper: InsertPaper) => {
    await db
        .insert(papers)
        .values(paper)
        .onConflictDoNothing()
        .returning()
        .execute()
    return addExistingPaperToProject(projectId, paper.paperId)
}

export const addSearchToProject = async (projectId: number, query: string) => {
    return db.insert(searches).values({
        projectId,
        createdAt: (new Date()).toDateString(),
        query
    }).returning().execute()
}