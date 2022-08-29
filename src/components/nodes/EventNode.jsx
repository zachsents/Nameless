import { Position, useEdges, useNodes } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { useExecuteEvent } from '../../execution/hooks'
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
            <ExecuteEvent id={props.id} />
        </>
    )
}

function ExecuteEvent({ id }) {

    // need these to force rerender when anything changes in the graph
    const nodes = useNodes()
    const edges = useEdges()
    
    useExecuteEvent(id)

    return <></>
}