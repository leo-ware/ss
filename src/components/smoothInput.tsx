import { useState, useRef, useEffect } from "react"

type SmoothInputProps = {
    name: string,
    action: (formData: FormData) => void,
    onSave: () => any,

    data: object,
    value: string,
    placeholder?: string,
    disabled?: boolean

    className?: string,
}

const SmoothInput = (props: SmoothInputProps) => {
    const [local, setLocal] = useState(props.value)
    const submitRef = useRef(null)

    console.log("prop", props.value)
    console.log("state", local)

    useEffect(() => {
        setLocal(props.value)
    }, [props.value])

    return (
        <form action={props.action}>
            {Object.entries(props.data).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value}/>
            ))}
            <button type="submit" className="hidden" ref={submitRef}/>
            <input
                disabled={props.disabled}
                className={props.className}
                name={props.name}
                value={local}
                placeholder={props.placeholder}
                onChange={(e) => setLocal(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        // @ts-ignore
                        e.target.blur()
                    } else if (e.key === "Escape") {
                        setLocal(props.value)
                        // @ts-ignore
                        e.target.blur()
                    }
                }}
                onBlur={() => {
                    // @ts-ignore
                    submitRef.current?.click()
                    props.onSave()
                    }}/>
        </form>
    )
}

export default SmoothInput