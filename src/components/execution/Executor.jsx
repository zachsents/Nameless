import { useListState } from "@mantine/hooks"
import { useReactFlow } from "react-flow-renderer"

export default function Executor({ nodes, edges }) {

    const reactFlow = useReactFlow()

    // NOTE: the order of these hook calls is important. Transforms rely on effects
    // triggered when value sources change. They need to be setup before action
    // functions to ensure actions have the most recent values.

    // set up transforms
    // nodes
    //     .filter(node => node.type == "transform")
    //     .forEach(node => {
    //         useExecuteTransform(node, reactFlow)
    //     })

    // // set up states
    // nodes
    //     .filter(node => node.type == "state")
    //     .forEach(node => {
    //         useExecuteState(node, reactFlow)
    //     })

    // // set up actions
    // nodes
    //     .filter(node => node.type == "action")
    //     .forEach(node => {
    //         useExecuteAction(node, reactFlow)
    //     })

    // // set up events
    // nodes
    //     .filter(node => node.type == "event")
    //     .forEach(node => {
    //         useExecuteEvent(node, reactFlow)
    //     })

    return <></>
}

