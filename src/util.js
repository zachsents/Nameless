import { useEffect } from "react"
import { getConnectedEdges } from "react-flow-renderer"
import { Action, NextActionHandle, TriggerProp } from "./nodes/actions"
import { ActionHandle, Event } from "./nodes/events"
import { SetProp, State } from "./nodes/states"
import { Transform } from "./nodes/transforms"

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

export function getInputValues(node, reactFlow, supplementalKeys = []) {
    return Object.fromEntries([
        ...supplementalKeys.map(key => [key, undefined]),
        ...getConnectedEdges([node], reactFlow.getEdges())
            .filter(edge => edge.target == node.id)
            .map(edge => {
                const targetHandle = new Handle(edge.targetHandle)
                const sourceHandle = new Handle(edge.sourceHandle)
                const data = reactFlow.getNode(edge.source).data[sourceHandle.name]
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
            const output = reactFlow.getNode(edge.target).data[targetHandle.name]

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

export function useExecuteState(node, reactFlow) {
    const state = State[node.data.state]
    const inputs = getInputValues(node, reactFlow)

    // TO DO: pull setup and setter/getter from State def

    // create setter
    const setter = _ => setNodeProp(node.id, "current", _, reactFlow)

    // set initial value
    useEffect(() => {
        if (inputs.initial != null && node.data.current === undefined)
            setter(inputs.initial)
    }, [inputs?.initial])

    // expose setter
    useEffect(() => {
        setNodeProp(node.id, SetProp, setter, reactFlow)
    }, [])
}

export function useExecuteAction(node, reactFlow) {
    const action = Action[node.data.action]

    // expose action on trigger prop
    useEffect(() => {
        setNodeProp(node.id, TriggerProp, _ => {
            // gather inputs
            const inputs = getInputValues(node, reactFlow)
            delete inputs[TriggerProp]

            // find chained action
            const fireNextAction = getActionsFire(node, NextActionHandle, reactFlow)

            // execute action and pass along chained action
            action.function(_, inputs, fireNextAction)
        }, reactFlow)
    }, [])
}

export function useExecuteEvent(node, reactFlow) {
    const event = Event[node.data.event]
    const inputs = getInputValues(node, reactFlow)

    // find connected action(s) and set them up to fire
    const fire = getActionsFire(node, ActionHandle, reactFlow)

    // execute useListen hook provided by event def
    event.useListen?.(fire, inputs)

    // wrap regular listener in useEffect
    event.listen && useEffect(event.listen(fire, inputs), [])
}

export function useExecuteTransform(node, reactFlow) {
    const transform = Transform[node.data.transform]
    const inputs = getInputValues(node, reactFlow, transform.inputs)

    // update self when inputs change
    // TO DO: change the way this works. maybe not the best
    // to recalculate with side-effects, but instead use getter functions
    // for all values. up for debate

    useEffect(() => {
        const calculation = transform.function(inputs)
        setNodeProps(node.id, calculation, reactFlow)
    }, Object.values(inputs))
}