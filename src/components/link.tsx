"use client"

import Link from "next/link"
import { MouseEventHandler, useRef } from "react"

export default (props: {href: string, children: React.ReactNode, className?: string}) => {
    const mdHandler: MouseEventHandler<HTMLAnchorElement> = () => ref.current?.click()
    const ref = useRef<HTMLAnchorElement>(null)
    return (
        <Link
            className={`${props.className} text-black hover:text-gray-600 hover:underline`}
            href={props.href}
            ref={ref}
            onMouseDown={mdHandler}>
            {props.children}
        </Link>
    )
}