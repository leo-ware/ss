"use client"

import { useState } from "react"

type Tab = {
    page: React.ReactNode
    name: string
    initActive?: boolean
}

type TabsType = {
    tabs: Tab[]
    className?: string
}

export default (props: TabsType) => {
    const activeTabs = props.tabs.map((t, i): [Tab, number] => [t, i]).filter(([t]) => t.initActive)
    const firstActive = (activeTabs.length > 0 && activeTabs[0][1]) || 0

    const [active, setActive] = useState<number>(firstActive)

    if (active < 0 || (props.tabs.length > 0 && active >= props.tabs.length)) {
        setActive(0)
    }

    return (
        <div className={props.className}>
            <div className="flex flex-row justify-stretch">
                {props.tabs.map((tab, i) => (
                    <div
                        onMouseDown={() => setActive(i)}
                        className={`flex-grow flex justify-center 
                         ${i == active
                            ? " bg-gray-200"
                            : " hover:bg-gray-100 "
                        }`}>
                        {tab.name}
                    </div>
                ))}
            </div>

            {props.tabs[active].page}

        </div>
    )
}