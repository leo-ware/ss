
export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0
}

export const last = <T>(arr: T[]) => {
    return arr[arr.length - 1]
}