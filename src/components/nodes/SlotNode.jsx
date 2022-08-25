import { Position } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

export default function SlotNode({ data: { inputs, ...data } }) {
    return (
        <>
            <HandleGroup
                position={Position.Left}
                dataType={DataType.Value}
                type="target"
                handles={inputs}
            />
            <NodeInner label={data.label} typeLabel="Slot" />
        </>
    )
}
