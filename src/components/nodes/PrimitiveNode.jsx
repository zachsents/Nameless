import { Image, NumberInput, Stack, Switch, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { Position, useReactFlow } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import { Primitive } from '../../nodes/primitives'
import { setNodeProp } from '../../util'
import HandleGroup from './HandleGroup'
import NodeInner from './NodeInner'

const handleName = " "

export default function PrimitiveNode({ id, data }) {

    const reactFlow = useReactFlow()

    // callback for setting the value in the store
    const value = data[handleName]
    const setValue = newValue => setNodeProp(id, handleName, newValue, reactFlow)

    // determine input component from type -- memoized
    const inputComponent = useMemo(() => {
        switch (data.primitive) {
            case Primitive.String.id:
                return <TextInput value={value ?? ""} onChange={event => setValue(event.currentTarget.value)} />
            case Primitive.Number.id:
                return <NumberInput value={value ?? 0} onChange={setValue} styles={numberInputStyle} />
            case Primitive.Boolean.id:
                return <Switch checked={value ?? false} onLabel='ON' offLabel='OFF' size='lg' onChange={event => setValue(event.currentTarget.checked)} />
            case Primitive.Image.id:
                return <Stack sx={{ width: 200 }} >
                    <Image src={value} withPlaceholder />
                    <TextInput onChange={event => setValue(event.currentTarget.value)} />
                </Stack>
        }
    }, [value])

    return (
        <>
            <HandleGroup
                position={Position.Right}
                dataType={DataType.Value}
                type="source"
                handles={[handleName]}
            />
            <NodeInner typeLabel={data.label}>
                {inputComponent}
            </NodeInner>
        </>
    )
}


const numberInputStyle = theme => ({
    root: {
        margin: "-5px -40px -5px -40px",
        width: 100,
    },
    input: {
        textAlign: "center",
    }
})