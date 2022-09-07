import { NumberInput } from "@mantine/core"
import { setNodeState, useNodeState } from "../../util"

export function Number(props) {

    const [value, setValue] = useNodeState(props.id)

    return (
        <NumberInput value={value ?? 0} onChange={val => setValue(val, true)} styles={numberInputStyle} />
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