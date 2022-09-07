import { runFlow } from "../../../exec-vanilla"

console.debug("[Execution] Worker is running")

onmessage = async event => {
    console.debug("[Execution] Starting flow")
    const { nodes, edges } = event.data
    runFlow(nodes, edges)
}