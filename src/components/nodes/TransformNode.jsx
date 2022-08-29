import { Position, useEdges, useNodes } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { useExecuteTransform } from '../../execution/hooks'
import { Transform } from '../../nodes/transforms'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function TransformNode(props) {

    const { inputs, outputs } = Transform[props.data.transform]

    useExecuteTransform(props.id)

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
                dataType={DataType.Value}
                type="source"
                handles={outputs}
            />
            <NodeInner label={props.data.label} typeLabel="Transform" {...props} />
            <ExecuteTransform id={props.id} />
        </>
    )
}

function ExecuteTransform({ id }) {

    // need these to force rerender when anything changes in the graph
    const nodes = useNodes()
    const edges = useEdges()
    
    useExecuteTransform(id)

    return <></>
}