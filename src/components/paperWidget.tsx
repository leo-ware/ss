
export type PaperWidgetType = {
    title: string
    authors?: {name: string, authorId: string}[]
    year: number
    venue?: string
    abstract?: string | null
    paperId: string
}

const PaperWidget = (props: PaperWidgetType) => {
    return (
        <div className="">
            <div className="w-full flex justify-between">
                <h3>{props.title}</h3>
                <div className="pl-4">{props.year}</div>
            </div>
            
            <div className="w-full flex justify-between">
                <div>{(props.authors || []).map(a => a.name).join(", ") || <em>[unkown author]</em>}</div>
                <div className="float-right">{props.venue}</div>
            </div>

            <details>
                <summary>Abstract</summary>
                <p>{props.abstract || [<em>no abstract</em>]}</p>
            </details>
        </div>
    )
}

export default PaperWidget
