import { Position, useReactFlow } from "react-flow-renderer"
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'
import { DataType } from "../../dataTypes"
import { Text, TextInput } from "@mantine/core"
import { useCallback, useState } from "react"
import { setNodeProp } from "../../util"
import { SetProp } from "../../nodes/states"

export default function StateNode({ id, data }) {

    const reactFlow = useReactFlow()

    const setName = newName => setNodeProp(id, "name", newName, reactFlow)

    const nameInputStyles = useCallback(theme => ({
        input: {
            textAlign: "center",
            minWidth: 50,
            width: `calc(20px + ${data.name?.length ?? 0}ch)`,
        }
    }), [data.name])

    return (
        <>
            <HandleGroup
                position={Position.Left}
                dataType={DataType.Value}
                type="target"
                handles={["initial"]}
            />
            <HandleGroup
                position={Position.Right}
                dataType={DataType.Value}
                type="source"
                handles={["current"]}
            />
            <HandleGroup
                position={Position.Bottom}
                dataType={DataType.Signal}
                type="target"
                handles={[SetProp]}
            />

            <NodeInner typeLabel={data.label}>
                <TextInput
                    autoFocus={true}
                    variant="unstyled"
                    placeholder="State"
                    value={data.name || ""}
                    onChange={event => setName(event.currentTarget.value)}
                    styles={nameInputStyles}
                />
                <Text size={8} align="center" mt={-10}>{data.current}</Text>
            </NodeInner>
        </>
    )
}