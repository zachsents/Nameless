import { Position } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { Action, NextActionHandle, TriggerProp } from '../../nodes/actions'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function ActionNode(props) {

    const { inputs, chainable } = Action[props.data.action]

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
        </>
    )
}
