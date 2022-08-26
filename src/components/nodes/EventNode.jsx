import { Position } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { ActionHandle, Event } from '../../nodes/events'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function EventNode(props) {

    const { inputs } = Event[props.data.event]

    return (
        <>
            <HandleGroup
                position={Position.Left}
                dataType={DataType.Value}
                type="target"
                handles={inputs}
            />
            <HandleGroup
                position={Position.Right}
                dataType={DataType.Signal}
                type="source"
                handles={[ActionHandle]}
            />
            <NodeInner label={props.data.label} typeLabel="Event" {...props} />
        </>
    )
}
