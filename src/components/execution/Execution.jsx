import { Alert, Button, Group, Overlay, Stack } from '@mantine/core'
import { useTimeout, useDisclosure } from "@mantine/hooks"
import { useEdges, useNodes, useReactFlow } from 'react-flow-renderer'
import { useExecutionStore } from '../../execution/store'
import Executor from './Executor'

import { CgPlayButton, CgPlayStop } from "react-icons/cg"
import { useEffect } from 'react'

export default function Execution() {

    const reactFlow = useReactFlow()
    const nodes = useNodes()
    const edges = useEdges()

    const executionStore = useExecutionStore()

    // fit nodes to view when running
    useEffect(() => {
        // executionStore.running && reactFlow.fitView({ padding: 0.5 })
    }, [executionStore.running])

    return (
        <>
            <Stack sx={containerStyle}>
                <Group position="right">
                    {executionStore.running ?
                        <Button
                            onClick={executionStore.stopRunning}
                            color="red"
                            sx={buttonStyle}
                        >
                            <CgPlayStop />
                        </Button> :
                        <Button
                            onClick={executionStore.startRunning}
                            color="green"
                            sx={buttonStyle}>
                            <CgPlayButton />
                        </Button>}
                </Group>
                {/* <Console logs={logs} /> */}
            </Stack>
            {executionStore.running &&
                <>
                    <Executor nodes={nodes} edges={edges} />
                    {/* <Overlay opacity={0} zIndex={50} onClick={handleOverlayClick} /> */}
                </>}
        </>
    )
}

const buttonStyle = theme => ({
    pointerEvents: "auto",
    fontSize: 32,
})

const containerStyle = theme => ({
    position: "absolute",
    top: 10,
    right: 10,
    width: 300,
    zIndex: 100,
    pointerEvents: "none",
    zIndex: 100,
})
