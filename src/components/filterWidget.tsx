import { useState } from "react"
import type { PaperWidgetType } from "./paperWidget"
import { isEmpty } from "@/utils"

type FilterMenuType = {
    setFilterFunction: (filterFunction: () => (paper: PaperWidgetType) => boolean) => void
    authors?: PaperWidgetType["authors"]
    venues?: string[]
}

const FilterMenu = (props: FilterMenuType) => {
    const [yearMin, setYearMin] = useState<number | undefined>(undefined)
    const [yearMax, setYearMax] = useState<number | undefined>(undefined)
    const [authors, setAuthors] = useState<Set<string>>(new Set())
    const [venue, setVenue] = useState<string | undefined>(undefined)

    const buildFilterFunction = () => {
        const f = (paper: PaperWidgetType) => {
            if (yearMin && paper.year < yearMin) {
                return false
            }
            if (yearMax && paper.year > yearMax) {
                return false
            }
            if (
                !authors.size &&
                !paper.authors?.map(a => a.authorId).some(id => authors.has(id))
            ) {
                return false
            }
            if (venue && paper.venue !== venue) {
                return false
            }
            return true
        }
        props.setFilterFunction(() => f)
    }

    return (
        <div>
            <div className="flex flex-col">
                <div>
                    <label>Year Min</label>
                    <input
                        className="border border-black rounded"
                        type="number"
                        value={yearMin}
                        onChange={(e) => setYearMin(parseInt(e.target.value))} />
                </div>
                
                <div>
                    <label>Year Max</label>
                    <input
                        className="border border-black rounded"
                        type="number"
                        value={yearMax}
                        onChange={(e) => setYearMax(parseInt(e.target.value))} />
                </div>
                
                <div>
                    <details>
                        <summary>Authors</summary>
                        <div className="max-h-64 overflow-y-scroll p-2">
                            {props.authors?.map((author) => (
                                <div key={author.authorId}>
                                    <input
                                        type="checkbox"
                                        value={author.authorId}
                                        onChange={(e) => {
                                            const newAuthors = new Set(authors)
                                            if (e.target.checked) {
                                                newAuthors.add(author.authorId)
                                            } else {
                                                newAuthors.delete(author.authorId)
                                            }
                                            setAuthors(newAuthors)
                                        }} />
                                    <label className="ml-2">{author.name}</label>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>

                <div>
                    <details>
                        <summary>Venue</summary>
                        <div className="max-h-64 overflow-y-scroll p-2">
                            {props.venues?.map((venue) => (
                                <div>
                                    <input
                                        type="checkbox"
                                        value={venue}/>
                                    <label className="ml-2">{venue}</label>
                                </div>
                            ))}
                        </div>
                    </details>
                </div>
            </div>
            <div>
                <button
                    className="border border-black p-1 rounded"
                    onClick={buildFilterFunction}>
                    Apply
                </button>
            </div>
        </div>
    )
}

export default FilterMenu