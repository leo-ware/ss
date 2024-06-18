"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import useSWR from "swr"
import Link from "next/link"
import { getProjects, getProject } from "@/api/projects"
import type { SelectPaper, SelectProject } from "@/db/schema"
import PaperWidget, {PaperWidgetType} from "@/components/paperWidget"
import FilterMenu from "@/components/filterWidget"
import { last } from "@/utils"
import Radio from "@/components/radio"
import { FiXCircle, FiCheckCircle, FiHome } from "react-icons/fi"
import { saveFormHandler, searchHandler } from "./actions"

const SearchPage = ({ params }: { params: { projectId: string }}) => {

    const projects = useSWR<SelectProject[]>("projects", getProjects)
    const projectId = parseInt(params.projectId)
    const project = useSWR("this project", () => getProject(projectId))

    const [searchResults, formAction] = useFormState(searchHandler, null)

    const savedPapersRemote = project.data?.projectToPaper.map((p) => p.paper) || []
    const [savedPapersLocal, setSavedPapersLocal] = useState<SelectPaper[]>([])
    const savedPapers = savedPapersLocal.concat(savedPapersRemote || [])
    const [discardedPaperIds, setDiscardedPaperIds] = useState<string[]>([])
    
    const filteredIds = new Set(savedPapers.map((paper) => paper.paperId).concat(discardedPaperIds))
    const [filterFunction, setFilterFunction] = useState<(paper: PaperWidgetType) => boolean>(() => () => true)
    const filteredPapers = searchResults && searchResults.ok
        ? (searchResults.data.data?.data || [])
            .filter((paper) => !filteredIds.has(paper.paperId))
            .filter((paper) => filterFunction(paper))
        : []

    const savePaper = (paper: SelectPaper) => {
        setSavedPapersLocal([...savedPapersLocal, paper])
        setTimeout(() => {
            project.mutate()
            projects.mutate()
        }, 500)
    }

    const discardPaper = (paper: PaperWidgetType) => {
        setDiscardedPaperIds([...discardedPaperIds, paper.paperId])
    }

    const allAuthors = filteredPapers.flatMap((paper) => paper.authors || [])
    const allVenues = filteredPapers.flatMap((paper) => [paper.venue] || [])
    const topAuthors: PaperWidgetType["authors"] = []
    const topJournals: string[] = []

    return (
        <div className="col-span-10 grid grid-cols-subgrid">
            <div className="col-span-2 h-full flex flex-row">
                <Radio
                    placeholder="Loading..."
                    initSelected={project.data
                        ? {name: project.data.name, value: project.data.id.toString()}
                        : undefined}
                    options={projects.data
                        ? projects.data.map((project) => ({
                            name: (
                                <Link href={`/projects/${project.id.toString()}/search`}>
                                    {project.name}
                                </Link>
                            ),
                            value: project.id.toString()
                        }))
                        : []}/>
                <Link href={`/projects/${projectId.toString}`}>
                    <div className="w-12 h-12 border border-black rounded">
                        <FiHome size={25} width={1}/>
                    </div>
                </Link>
            </div>

            <div className="flex items-center col-span-6 col-start-3 my-4">
                <form action={formAction}>
                    <input type="hidden" name="projectId" value={projectId} />
                    <input
                        className="border border-black rounded w-96 p-2 my-2 focus:outline-none"
                        type="text"
                        name="query" />
                    <button
                        className="border border-black rounded p-2 m-2 focus:outline-none"
                        type="submit">
                            Search
                    </button>
                </form>
            </div>

            <div className="col-span-2 col-start-9">
                <details>
                    <summary>Saved Papers {`(${savedPapersLocal.length})`}</summary>
                    {savedPapers.map((paper) => (

                        <div className="ml-6">
                            [Authors]
                            {/* {(paper.authors && paper.authors.length) ? last(paper.authors[0].name.split(" ")) : ""}
                            {paper.authors && paper.authors.length > 1 ? " et al." : ""} */}
                            {" "}
                            ({paper.year})
                            {" "}
                            <em>
                                {paper.title.substring(0, 30)}
                                {paper.title.length > 50 ? "..." : ""}
                            </em>
                        </div>
                    ))}
                </details>

                <details>
                    <summary>Top Authors</summary>
                    {topAuthors.map((author) => (
                        <div className="ml-6">{author.name}</div>
                    ))}
                </details>

                <details>
                    <summary>Top Journals</summary>
                    {topJournals.map((journal) => (
                        <div className="ml-6">{journal}</div>
                    ))}
                </details>
            </div>

            <div className=" col-start-1 col-span-2 pr-4">
                <FilterMenu
                        setFilterFunction={setFilterFunction}
                        authors={allAuthors}
                        venues={allVenues}/>
            </div>

            <div className="col-span-6 col-start-3 grid grid-cols-subgrid">
                {filteredPapers.map(paper => (
                    <div className="mb-16 col-span-6 grid grid-cols-subgrid">
                        <div className="col-span-5">
                            <PaperWidget {...paper} />
                        </div>
                        <div className="col-span-1 col-start-6 ml-8">
                            <form action={saveFormHandler} onSubmit={() => savePaper(paper)}>
                                <input type="hidden" name="paperId" value={paper.paperId} />
                                <input type="hidden" name="projectId" value={projectId} />
                                <input type="hidden" name="paperData" value={JSON.stringify(paper)} />
                                <button type="submit">
                                    <FiCheckCircle size={25} />
                                </button>
                            </form>
                            
                            <br/>
                            <button onClick={() => discardPaper(paper)}>
                                <FiXCircle size={25}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SearchPage;