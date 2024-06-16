"use server"

import {search} from "./semanticScholar"
import { zfd } from "zod-form-data"

const searchActionValidator = zfd.formData({
    query: zfd.text(),
    limit: zfd.numeric().optional(),
    offset: zfd.numeric().optional()
})

type SearchActionResult = {ok: false, error?: string} | {
    ok: true,
    data: Awaited<ReturnType<typeof search>>,
    _prev?: {
        query: string
        next?: number
    }
}

export const searchFormAction = async (_: any, formData: FormData): Promise<SearchActionResult> => {
    try {
        const qObj = searchActionValidator.parse(formData)
        const result = await search(qObj)
        console.log(JSON.stringify(result))
        if (!result || !result.data) {
            return { ok: false, error: "error fetching data" }
        }
        return { ok: !result.error, data: result, _prev: { query: qObj.query, next: result.data.next }}
    } catch (e) {
        return { ok: false, error: "error validating request" }
    }
}