import shortUUID from "short-uuid"

export const TriggerProp = "trigger"
export const NextActionHandle = "nextAction"

export const Action = {
    ConsoleLog: {
        id: "ConsoleLog",
        name: "Log",
        description: "Prints to console.",
        inputs: [],
        function: _ => console.log(_),
        chainable: false,
    },
    PassEvent: {
        id: "PassEvent",
        name: "Reassign Signal Value",
        displayName: "⏩",
        inputs: ["value"],
        description: "Assign a different value to an event signal.",
        function: (_, { value }, nextAction) => {
            nextAction(value)
        },
        chainable: true,
    },
    SaveToLocalStorage: {
        id: "SaveToLocalStorage",
        name: "Save to Local Storage",
        description: "Write value to browser's local storage.",
        inputs: ["key"],
        function: (_, { key }) => {
            key && localStorage.setItem(key, _)
        },
        chainable: false,
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