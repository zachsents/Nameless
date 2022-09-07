import { useCallback, useState } from "react"
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Controls, MiniMap, updateEdge } from "react-flow-renderer"
import { validateEdgeConnection } from "../util"
import DeletableEdge from "./DeletableEdge"
import Search from "./search/Search"

import { NodeTypes } from "../../../exec-vanilla"
import Node from "./nodes/Node"
import Execution from "./execution/Execution"


const nodeTypes = Object.fromEntries(
    Object.keys(NodeTypes).map(type => [ type, Node ])
)

const edgeTypes = {
    deletable: DeletableEdge
}


export default function Flow() {

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

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
                <Search />
                <Execution />
            </ReactFlow>
        </>
    )
}
