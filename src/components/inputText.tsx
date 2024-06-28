type InputTextType = {
    value?: string
    name?: string
    placeholder?: string
    required?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    type?: string
    small?: boolean
}

export default (props: InputTextType) => {
    return (
        <input
            className={"border border-black focus:outline-none rounded " + (props.small? "p-1": "p-2")}
            type={props.type || "text"}
            {...props} />
    )
}