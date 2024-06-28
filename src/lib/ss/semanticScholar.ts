import { z } from "zod"

const searchEndpoint = 'https://api.semanticscholar.org/graph/v1/paper/search'
const fields = ["title", "venue", "authors", "year", "abstract", "referenceCount", "citationCount", "url"]
const API_KEY = process.env.SEMANTIC_SCHOLAR_API_KEY

type SearchQueryType = {
    query: string
    limit?: number
    offset?: number
}

const ssSearchResultSchema = z.object({
    offset: z.number(),
    total: z.number(),
    next: z.number(),
    data: z.array(z.object({
        paperId: z.string(),
        title: z.string(),
        year: z.number(),
        authors: z.array(z.object({
            name: z.string(),
            authorId: z.string(),
        })).optional(),
        abstract: z.string().nullable(),
        venue: z.string(),
        url: z.string(),
        citationCount: z.number(),
        referenceCount: z.number(),
    })).optional()
})

export const search = async (query: string | SearchQueryType) => {
    const completeQuery = Object.assign({
        limit: 20,
        offset: 0,
        fields: fields.join(",")
    }, typeof query === 'string' ? { query } : query)

    const params = new URLSearchParams()
    Object.entries(completeQuery).forEach(([key, value]) => params.append(key, "" + value))
    const queryUrl = `${searchEndpoint}?${params.toString()}`

    const response = await fetch(queryUrl, {
        method: 'GET',
        // @ts-ignore
        headers: {
            'x-api-key': API_KEY
        }
    })

    return ssSearchResultSchema.safeParse(await response.json())
}