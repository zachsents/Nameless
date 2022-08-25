import shortUUID from "short-uuid"

export const Transform = {
    Add: {
        id: "Add",
        name: "Add",
        inputs: ["a", "b"],
        outputs: ["sum"],
        function: ({ a, b }) => ({ sum: a + b })
    },
    LowerCase: {
        id: "LowerCase",
        name: "Lower Case",
        inputs: ["in"],
        outputs: ["out"],
        function: ({ in: input }) => ({ out: input?.toLowerCase() })
    },
    UpperCase: {
        id: "UpperCase",
        name: "Upper Case",
        inputs: ["in"],
        outputs: ["out"],
        function: ({ in: input }) => ({ out: input?.toUpperCase() })
    },
    Mux: {
        id: "Mux",
        name: "Mux",
        inputs: ["condition", "a", "b"],
        outputs: ["out"],
        function: ({ condition, a, b }) => ({ out: condition ? a : b })
    }
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