import { Position, useEdges, useNodes, useReactFlow } from "react-flow-renderer"
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'
import { DataType } from "../../dataTypes"
import { Text, TextInput } from "@mantine/core"
import { useCallback, useState } from "react"
import { setNodeProp } from "../../util"
import { SetProp } from "../../nodes/states"
import { useExecuteState } from "../../execution/hooks"

export default function StateNode(props) {

    const reactFlow = useReactFlow()

    const setName = newName => setNodeProp(props.id, "name", newName, reactFlow)

    const nameInputStyles = useCallback(theme => ({
        input: {
            textAlign: "center",
            minWidth: 50,
            width: `calc(20px + ${props.data.name?.length ?? 0}ch)`,
        }
    }), [props.data.name])

    useExecuteState(props.id)

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

            <NodeInner typeLabel={props.data.label} {...props}>
                <TextInput
                    autoFocus={true}
                    variant="unstyled"
                    placeholder="State"
                    value={props.data.name || ""}
                    onChange={event => setName(event.currentTarget.value)}
                    styles={nameInputStyles}
                />
                <Text size={8} align="center" mt={-10}>{props.data.current}</Text>
            </NodeInner>
            <ExecuteState id={props.id} />
        </>
    )
}

function ExecuteState({ id }) {

    // need these to force rerender when anything changes in the graph
    const nodes = useNodes()
    const edges = useEdges()
    
    useExecuteState(id)

    return <></>
}