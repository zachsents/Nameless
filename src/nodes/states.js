import { useState } from "react"
import shortUUID from "short-uuid"

export const SetProp = "set"

export const State = {
    Simple: {
        id: "Simple",
        name: "Variable",
    },
}

export function createStateNode({ id, name }, position = [0, 0]) {
    return {
        id: `${id}-${shortUUID.generate()}`,
        type: "state",
        data: {
            label: name,
            state: id,
        },
        position: { x: position[0], y: position[1] }
    }
}