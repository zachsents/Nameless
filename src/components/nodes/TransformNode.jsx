import { Position } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { Transform } from '../../nodes/transforms'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function TransformNode({ data }) {

    const { inputs, outputs } = Transform[data.transform]

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
            <NodeInner label={data.label} typeLabel="Transform" />
        </>
    )
}
