import { useEffect } from "react"
import { Action, NextActionHandle, TriggerProp } from "../nodes/actions"
import { ActionHandle, Event } from "../nodes/events"
import { SetProp, State } from "../nodes/states"
import { Transform } from "../nodes/transforms"
import { getActionsFire, getInputValues, setNodeProp, setNodeProps } from "../util"
import { useReactFlow } from "react-flow-renderer"

export function useExecuteState(nodeId) {
    const reactFlow = useReactFlow()
    const node = reactFlow.getNode(nodeId)
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

export function useExecuteAction(nodeId) {
    const reactFlow = useReactFlow()
    const node = reactFlow.getNode(nodeId)
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

export function useExecuteEvent(nodeId) {
    const reactFlow = useReactFlow()
    const node = reactFlow.getNode(nodeId)
    const event = Event[node.data.event]
    const inputs = getInputValues(node, reactFlow)

    // find connected action(s) and set them up to fire
    const fire = getActionsFire(node, ActionHandle, reactFlow)

    // execute useListen hook provided by event def
    event.useListen?.(fire, inputs)

    // wrap regular listener in useEffect
    event.listen && useEffect(event.listen(fire, inputs), [])
}

export function useExecuteTransform(nodeId) {
    const reactFlow = useReactFlow()
    const node = reactFlow.getNode(nodeId)
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