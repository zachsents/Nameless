import { useCallback, useState } from "react";
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Controls, MiniMap, updateEdge, useStore } from "react-flow-renderer"
import { Action, createActionNode } from "../nodes/actions";
import { createEventNode, Event } from "../nodes/events";
import { createPrimitiveNode, Primitive } from "../nodes/primitives";
import { createStateNode, State } from "../nodes/states";
import { createTransformNode, Transform } from "../nodes/transforms";
import { Handle, validateEdgeConnection } from "../util";
import DeletableEdge from "./DeletableEdge";
import Execution from "./execution/Execution";
import Executor from "./execution/Executor";
import ActionNode from "./nodes/ActionNode";
import EventNode from "./nodes/EventNode";
import PrimitiveNode from "./nodes/PrimitiveNode";
import SlotNode from "./nodes/SlotNode";
import StateNode from './nodes/StateNode';
import TransformNode from "./nodes/TransformNode";
import Search from "./search/Search";

const nodeTypes = {
    state: StateNode,
    transform: TransformNode,
    action: ActionNode,
    event: EventNode,
    primitive: PrimitiveNode,
    slot: SlotNode,
}

const edgeTypes = {
    deletable: DeletableEdge
}

const initialNodes = []
const initialEdges = []

export default function Flow() {

    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const onNodesChange = useCallback(
        changes => setNodes(nodes => applyNodeChanges(changes, nodes)),
        [setNodes]
    )

    const onEdgesChange = useCallback(
        changes => setEdges(edges => applyEdgeChanges(changes, edges)),
        [setEdges]
    )

    const removeEdge = id => setEdges(edges => edges.filter(e => e.id != id))

    const onConnect = useCallback(
        connection => validateEdgeConnection(connection, edges) &&
            setEdges(edges => addEdge({
                ...connection,
                type: "deletable",
                data: { _remove: removeEdge }
            }, edges)),
        [edges]
    )

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => validateEdgeConnection(newConnection, edges) &&
            setEdges(edges => updateEdge(oldEdge, newConnection, edges)),
        [edges]
    )

    return (
        <>
            <ReactFlow
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeUpdate={onEdgeUpdate}
                fitView
            >
                <MiniMap />
                <Controls />
                <Execution />
                <Search />
            </ReactFlow>
        </>
    )
}
