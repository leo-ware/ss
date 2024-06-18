"use client"

import { useState, useRef } from "react"

type OptionType = {name: React.ReactNode, value: string, className?: string}

type RadioProps = {
    options: OptionType[]
    initSelected?: OptionType
    name?: string
    placeholder?: string
    onChange?: (selected: OptionType) => void
}

const Radio = (props: RadioProps) => {
    const [selected, setSelected] = useState<RadioProps["options"][0] | null>(props.initSelected || null)
    const [open, setOpen] = useState(false)

    return (
        <div
            className={"relative min-w-24"}
            onClick={() => setOpen(!open)}>

            <select name={props.name} className="hidden">
                {selected && <option value={selected.value} />}
            </select>

            <div className={`p-2 absolute border border-black rounded ${selected?.className}`}>
                {(selected ? selected.name : props.placeholder || "-")}
            </div>
            
            {open && (
                <div className="h-24 border border-black rounded absolute bg-white overflow-auto">
                    {props.options.map(o => (
                        <div
                            className={`p-2 min-w-24 hover:bg-gray-200 cursor-pointer ${o.className}`}
                            key={o.value}
                            onClick={() => {
                                    setSelected(o)
                                    props.onChange && props.onChange(o)
                                    }}>
                                {o.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default Radio
