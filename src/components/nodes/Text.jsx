import { TextInput } from "@mantine/core"
import { useNodeState } from "../../util"

export function Text(props) {

    const [value, setValue] = useNodeState(props.id, "hello")

    return (
        <TextInput value={value ?? ""} onChange={event => setValue(event.currentTarget.value, true)} />
    )
}