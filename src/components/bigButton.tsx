
type BigButtonType = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode
    type?: "button" | "submit" | "reset"
}

const BigButton = (props: BigButtonType) => {
    return <button className="border border-black p-2 rounded" {...props} />
}

export default BigButton