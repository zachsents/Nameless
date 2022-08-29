import { Position, useEdges, useNodes } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { useExecuteAction } from '../../execution/hooks'
import { Action, NextActionHandle, TriggerProp } from '../../nodes/actions'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function ActionNode(props) {

    const { inputs, chainable } = Action[props.data.action]
    
    useExecuteAction(props.id)

    return (
        <>
            <HandleGroup
                position={Position.Left}
                dataType={DataType.Signal}
                type="target"
                handles={[TriggerProp]}
                hideLabel
            />
            <HandleGroup
                position={Position.Bottom}
                dataType={DataType.Value}
                type="target"
                handles={inputs}
            />
            {chainable &&
                <HandleGroup
                    position={Position.Right}
                    dataType={DataType.Signal}
                    type="source"
                    handles={[NextActionHandle]}
                    hideLabel
                />}
            <NodeInner label={props.data.label} typeLabel="Action" {...props} />
            <ExecuteAction id={props.id} />
        </>
    )
}

function ExecuteAction({ id }) {

    // need these to force rerender when anything changes in the graph
    const nodes = useNodes()
    const edges = useEdges()
    
    useExecuteAction(id)

    return <></>
}