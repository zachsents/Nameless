import { getConnectedEdges } from "react-flow-renderer"


export function validateEdgeConnection(connection, edges) {
    // only connect when handles have matching data types
    const sourceHandle = new Handle(connection.sourceHandle)
    const targetHandle = new Handle(connection.targetHandle)
    const sameDataType = sourceHandle.dataType == targetHandle.dataType

    // only allow one connection to any target
    const targetTaken = edges.some(edge =>
        edge.target == connection.target &&
        edge.targetHandle == connection.targetHandle
    )

    // if all tests are passed, make the connection
    return sameDataType && !targetTaken
}

export function setNodeProps(nodeId, changeObject, reactFlow) {
    reactFlow.setNodes(nodes => nodes.map(node => {
        if (node.id == nodeId)
            node.data = {
                ...node.data,
                ...changeObject
            }
        return node
    }))
}

export function setNodeProp(nodeId, propName, propValue, reactFlow) {
    setNodeProps(nodeId, {
        [propName]: propValue
    }, reactFlow)
}

export function removeNode(nodeId, reactFlow) {
    reactFlow.setNodes(nodes => nodes.filter(node => node.id != nodeId))
}

export function getInputValues(node, reactFlow, supplementalKeys = []) {
    return Object.fromEntries([
        ...supplementalKeys.map(key => [key, undefined]),
        ...getConnectedEdges([node], reactFlow.getEdges())
            .filter(edge => edge.target == node.id)
            .map(edge => {
                const targetHandle = new Handle(edge.targetHandle)
                const sourceHandle = new Handle(edge.sourceHandle)
                const data = reactFlow.getNode(edge.source)?.data[sourceHandle.name]
                return [
                    targetHandle.name,
                    data instanceof Getter ? data.get() : data
                ]
            })
    ])
}

export function getOutputValues(node, reactFlow) {
    const outputs = {}
    getConnectedEdges([node], reactFlow.getEdges())
        .filter(edge => edge.source == node.id)
        .forEach(edge => {
            const targetHandle = new Handle(edge.targetHandle)
            const sourceHandle = new Handle(edge.sourceHandle)
            const output = reactFlow.getNode(edge.target)?.data[targetHandle.name]

            outputs[sourceHandle.name]?.push(output) ||
                (outputs[sourceHandle.name] = [output])
        })
    return outputs
}

export function getActionsFire(node, handle, reactFlow) {
    const actions = getOutputValues(node, reactFlow)[handle]
    return _ => actions?.forEach(action => action?.(_))
}

export class Handle {
    constructor(handleId) {
        const split = handleId.match(/\<([\w\W]*?)\>(.*)/)
        this.dataType = split?.[1]
        this.name = split?.[2]
    }
}

export class Getter {
    constructor(get) {
        this.get = get
    }
}