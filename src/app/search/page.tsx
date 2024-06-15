"use client"

import { useState } from "react"
import { searchFormAction } from "@/actions"
import PaperWidget, {PaperWidgetType} from "@/components/paperWidget"
import FilterMenu from "@/components/filterWidget"
import { useFormState } from "react-dom"
import { last } from "@/utils"

const SearchPage = () => {
    const [searchResults, formAction] = useFormState(searchFormAction, null)

    const [savedPapers, setSavedPapers] = useState<PaperWidgetType[]>([])
    const [discardedPaperIds, setDiscardedPaperIds] = useState<string[]>([])
    const [filterFunction, setFilterFunction] = useState<(paper: PaperWidgetType) => boolean>(() => () => true)

    const savedPaperIds = new Set(savedPapers.map((paper) => paper.paperId))
    const discardedPaperIdsSet = new Set(discardedPaperIds)
    const filteredPapers = searchResults && searchResults.ok
        ? (searchResults.data.data?.data || [])
            .filter((paper) => !savedPaperIds.has(paper.paperId))
            .filter((paper) => !discardedPaperIdsSet.has(paper.paperId))
            .filter((paper) => filterFunction(paper))
        : []

    const savePaper = (paper: PaperWidgetType) => {
        setSavedPapers([...savedPapers, paper])
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
            <div className="flex items-center col-span-8 col-start-3 my-4">
                <form action={formAction}>
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

            <div className="col-span-2 pr-4">
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
                            <button onClick={() => savePaper(paper)}>Save</button>
                            <br/>
                            <button onClick={() => discardPaper(paper)}>Discard</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-span-2 col-start-9">
                <details>
                    <summary>Saved Papers {`(${savedPapers.length})`}</summary>
                    {savedPapers.map((paper) => (

                        <div className="ml-6">
                            {(paper.authors && paper.authors.length) ? last(paper.authors[0].name.split(" ")) : ""}
                            {paper.authors && paper.authors.length > 1 ? " et al." : ""}
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

        </div>
    )
}

export default SearchPage;