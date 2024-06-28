"use client"

import { useState, useRef, useEffect, ReactNode } from "react"

type RadioProps = {
    options: {[value: string]: ReactNode}
    initSelected?: string
    name?: string
    placeholder?: string
    onChange?: (value: string) => void
}

const PlaceholderWidget = (props: {value: string}) => (
    <div className="w-full h-full text-xs text-gray-600 flex items-center">
        {props.value}
    </div>
)

const Radio = (props: RadioProps) => {
    const [selected, setSelected] = useState<string>(props.placeholder? "__placeholder" : (props.initSelected || ""))
    const [open, setOpen] = useState(false)

    // close when click outside
    const containerRef = useRef<HTMLDivElement>(null);
    const handleClickOutside: EventListenerOrEventListenerObject = (event) => {
        console.log("fired")
        if (containerRef.current && event.target && !containerRef.current.contains(event.target as any)) {
            console.log("passed")
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const options: {[value: string]: ReactNode} = !props.placeholder ? props.options : (
        Object.fromEntries(
            ([["aaaaa__placeholder", <PlaceholderWidget value={props.placeholder}/>]] as [string, ReactNode][])
            .concat(Object.entries(props.options))
        )
    )

    return (
        <div
            className={"relative min-w-32 border border-black rounded p-1 flex " + (open? "h-24": "h-10")}
            onClick={() => setOpen(!open)}>
            
            {!open
            ? options[selected]
            : (
                <div className="w-full h-full overflow-auto">
                    {props.options && Object.entries(props.options).map(([value, Widget]) => (
                        <div className="w-full">
                            {Widget}
                        </div>
                    ))}
                </div>
            )}

            {/* <select name={props.name} className="hidden">
                {selected && <option value={selected.value} />}
            </select>

            <div className={`p-2 absolute border border-black rounded`}>
                {(selected ? selected.name : props.placeholder || "-")}
            </div>

            {open && (
                <div className="max-h-24 border border-black rounded absolute bg-white overflow-auto">
                    {props.options.map(o => (
                        <div
                            className={`p-2 min-w-24 hover:bg-gray-200 cursor-pointer ${o.className} ${props.className}`}
                            key={o.value}
                            onClick={() => {
                                setSelected(o)
                                props.onChange && props.onChange(o)
                            }}>
                            {o.name}
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    )

}

export default Radio
