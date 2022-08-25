import { useEffect } from "react"
import shortUUID from "short-uuid"

export const ActionHandle = "action"

export const Event = {
    OnStateChange: {
        id: "OnStateChange",
        name: "when variable changes",
        inputs: ["input"],
        useListen: (fire, { input }) => {
            useEffect(() => {
                fire(input)
            }, [input])
        },
    },
    OnSpecialButtonClick: {
        id: "OnSpecialButtonClick",
        name: "on special button click",
        inputs: [],
        listen: fire => {
            const specialButton = document.getElementById("special")
            specialButton?.addEventListener("click", fire)
            return () => specialButton?.removeEventListener("click", fire)
        },
    }
}

export function createEventNode({ id, name }, position = [0, 0]) {
    return {
        id: `${id}-${shortUUID.generate()}`,
        type: "event",
        data: {
            label: name,
            event: id,
        },
        position: { x: position[0], y: position[1] }
    }
}