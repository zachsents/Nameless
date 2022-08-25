import shortUUID from "short-uuid"

export const Transform = {
    Add: {
        id: "Add",
        name: "Add",
        inputs: ["a", "b"],
        outputs: ["sum"],
        function: ({ a, b }) => ({ sum: a + b })
    },
}

export function createTransformNode({ id, name }, position = [0, 0]) {
    return {
        id: `${id}-${shortUUID.generate()}`,
        type: "transform",
        data: {
            label: name,
            transform: id,
        },
        position: { x: position[0], y: position[1] }
    }
}