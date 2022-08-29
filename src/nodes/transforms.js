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
        description: "Convert text to lower case.",
        inputs: ["in"],
        outputs: ["out"],
        function: ({ in: input }) => ({ out: ("" + input)?.toLowerCase?.() })
    },
    UpperCase: {
        id: "UpperCase",
        name: "Upper Case",
        description: "Convert text to upper case.",
        inputs: ["in"],
        outputs: ["out"],
        function: ({ in: input }) => ({ out: ("" + input)?.toUpperCase?.() })
    },
    Mux: {
        id: "Mux",
        name: "Ternary",
        description: "Conditionally choose one value or another.",
        inputs: ["condition", "a", "b"],
        outputs: ["out"],
        function: ({ condition, a, b }) => ({ out: condition ? a : b })
    },
    Equals: {
        id: "Equals",
        name: "Equals",
        description: "Check if two values are the same.",
        categories: ["comparison"],
        inputs: ["a", "b"],
        outputs: ["out"],
        function: ({ a, b }) => ({ out: a == b })
    },
    GreaterThan: {
        id: "GreaterThan",
        name: "Greater Than",
        displayName: ">",
        description: "Check if one value is greater than the other.",
        categories: ["comparison"],
        inputs: ["a", "b"],
        outputs: ["out"],
        function: ({ a, b }) => ({ out: a > b })
    },
    GreaterThanOrEqualTo: {
        id: "GreaterThanOrEqualTo",
        name: "Greater Than or Equal to",
        displayName: ">=",
        description: "Check if one value is greater than or equal to the other.",
        categories: ["comparison"],
        inputs: ["a", "b"],
        outputs: ["out"],
        function: ({ a, b }) => ({ out: a >= b })
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