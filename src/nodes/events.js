import { useInterval } from "@mantine/hooks"
import { useEffect } from "react"
import shortUUID from "short-uuid"

export const ActionHandle = "action"

export const Event = {
    OnStateChange: {
        id: "OnStateChange",
        name: "When variable changes",
        description: "Detect changes in a value.",
        inputs: ["input"],
        useListen: (fire, { input }) => {
            useEffect(() => {
                fire(input)
            }, [input])
        },
    },
    OnInterval: {
        id: "OnInterval",
        name: "Interval",
        description: "Periodically fires.",
        inputs: ["period"],
        useListen: (fire, { period }) => {
            const interval = useInterval(() => fire(), period)

            useEffect(() => {
                interval.start()
                return interval.stop
            }, [period])
        },
    },
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