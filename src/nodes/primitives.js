import shortUUID from "short-uuid"

export const Primitive = {
    Number: {
        id: "Number",
        name: "Number",
    },
    String: {
        id: "String",
        name: "String",
    },
    Boolean: {
        id: "Boolean",
        name: "Switch",
    },
    Image: {
        id: "Image",
        name: "Image",
    }
}

export function createPrimitiveNode({ id, name }, position = [0, 0]) {
    return {
        id: `${id}-${shortUUID.generate()}`,
        type: "primitive",
        data: {
            label: name,
            primitive: id,
        },
        position: { x: position[0], y: position[1] }
    }
}