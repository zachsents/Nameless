import shortUUID from "short-uuid"

export const TriggerProp = "trigger"
export const NextActionHandle = "nextAction"

export const Action = {
    ConsoleLog: {
        id: "ConsoleLog",
        name: "Console Log",
        inputs: [],
        function: _ => console.log(_),
        chainable: false,
    },
    PassEvent: {
        id: "PassEvent",
        name: "⏩",
        inputs: ["value"],
        function: (_, { value }, nextAction) => {
            nextAction(value)
        },
        chainable: true,
    }
}

export function createActionNode({ id, name }, position = [0, 0]) {
    return {
        id: `${id}-${shortUUID.generate()}`,
        type: "action",
        data: {
            label: name,
            action: id,
        },
        position: { x: position[0], y: position[1] }
    }
}