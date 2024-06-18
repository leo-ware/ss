"use client"

import { interpretDate } from "@/utils"
import { useEffect, useState } from "react"

export const useTimeSince = (date: string | Date, int?: (d: string | Date) => string) => {
    const func = int || interpretDate
    const then = new Date(date)
    const [interpretation, setInterpretation] = useState<string>(func(then))
    
    useEffect(() => {
        setInterval(() => {
            setInterpretation(func(then))
        }, 1000)
    }, [])

    return interpretation
}

const TimeSince = ({date}: {date: string | Date}) => {
    const timeSince = useTimeSince(date)
    return <>{timeSince}</>
}

export default TimeSince