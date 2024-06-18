import z, { ZodObject } from "zod"

export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0
}

export const last = <T>(arr: T[]) => {
    return arr[arr.length - 1]
}

export const coerce_BADCODE = (t: ZodObject<any>) => ({
    parse: (obj: any) => {
        const sf = t.safeParse(obj)
        if (sf.success) {
            return sf.data
        }
        const cp = {...obj}
        sf.error.errors.forEach(error => {
            // @ts-ignore
            if (error.expected === "number" && error.received === "string") {
                cp[error.path[0]] = parseInt(cp[error.path[0]])
            }
            
        })
        return t.parse(cp)

        // throw new Error("Failed to coerce")
    }
})

export const interpretDate = (date: string | Date) => {
    const now = new Date()
    const then = new Date(date)
    const diff = now.getTime() - then.getTime()

    if (diff < 1000) {
        return "Just now"
    } else if (diff < 1000 * 60) {
        return `${Math.floor(diff / 1000)} seconds ago`
    } else if (diff < 1000 * 60 * 60) {
        return `${Math.floor(diff / 1000 / 60)} minutes ago`
    } else if (then.getDate() === now.getDate()) {
        return `Today`
    } else if (then.getDate() === now.getDate() - 1) {
        return `Yesterday`
    } else {
        return `${then.getMonth() + 1}/${then.getDate()}/${then.getFullYear()}`
    }
}