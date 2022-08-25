import { Button, Group, Stack } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { useEdges, useReactFlow } from "react-flow-renderer"
import { useExecuteAction, useExecuteEvent, useExecuteState, useExecuteTransform } from "../../util"

export default function Executor({ nodes, edges }) {

    const ed = useEdges()
    const reactFlow = useReactFlow()

    // set up logging state
    const [logs, logHandlers] = useListState()
    const log = message => logHandlers.prepend(`${new Date().toLocaleTimeString()} > ${message}`)

    // NOTE: the order of these hook calls is important. Transforms rely on effects
    // triggered when value sources change. They need to be setup before action
    // functions to ensure actions have the most recent values.

    // set up transforms
    nodes
        .filter(node => node.type == "transform")
        .forEach(node => {
            useExecuteTransform(node, reactFlow)
        })

    // set up states
    nodes
        .filter(node => node.type == "state")
        .forEach(node => {
            useExecuteState(node, reactFlow)
        })

    // set up actions
    nodes
        .filter(node => node.type == "action")
        .forEach(node => {
            useExecuteAction(node, reactFlow)
        })

    // set up events
    nodes
        .filter(node => node.type == "event")
        .forEach(node => {
            useExecuteEvent(node, reactFlow)
        })

    return (
        <Stack sx={containerStyle}>
            <Group position="right">
                <Button id="special" sx={buttonStyle}>Special</Button>
            </Group>
            {/* <Console logs={logs} /> */}
        </Stack>
    )
}

const buttonStyle = theme => ({
    pointerEvents: "auto"
})

const containerStyle = theme => ({
    position: "absolute",
    top: 10,
    right: 10,
    width: 300,
    zIndex: 100,
    pointerEvents: "none",
})