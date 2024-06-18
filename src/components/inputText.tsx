
type InputTextType = {
    value?: string
    name?: string
    placeholder?: string
    required?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputText = (props: InputTextType) => {
    return (
        <input className="border border-black p-2 focus:outline-none rounded" type="text" {...props} />
    )
}

export default InputText