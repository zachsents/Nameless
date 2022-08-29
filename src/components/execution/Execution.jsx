import { Button, Group, Stack } from '@mantine/core'
import { useListState } from "@mantine/hooks"
import { useEdges, useNodes, useReactFlow } from 'react-flow-renderer'
import { useExecutionStore } from '../../execution/store'
import Executor from './Executor'
import Console from "./Console"

import { CgPlayButton, CgPlayStop } from "react-icons/cg"
import { useEffect } from 'react'

export default function Execution() {

    // set up logging state
    const logs = useExecutionStore(store => store.logs)
    const log = useExecutionStore(store => store.log)
    const logWithTimestamp = message => log(`${new Date().toLocaleTimeString()} > ${message}`)

    // useEffect(() => {
    //     // executionStore.running && reactFlow.fitView({ padding: 0.5 })
    // }, [executionStore.running])

    return (
        <>
            <Stack sx={containerStyle}>
                {/* <Group position="right">
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
                </Group> */}
                {/* <Console logs={logs || []} /> */}
            </Stack>
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
    pointerEvents: "none",
    zIndex: 100,
})
