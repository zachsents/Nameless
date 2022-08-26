import { ActionIcon, Box, Group, HoverCard, Text, Tooltip } from '@mantine/core'
import React from 'react'
import * as nodeStyles from "./nodeStyles"

import { CgTrash } from "react-icons/cg"
import { removeNode } from '../../util'
import { useReactFlow } from 'react-flow-renderer'
import { useExecutionStore } from '../../execution/store'

export default function NodeInner({ label, typeLabel, children, selected, id }) {

    const reactFlow = useReactFlow()
    const executionRunning = useExecutionStore(state => state.running)

    const nodeContent =
        <Box sx={nodeStyles.inner}>
            <Text size={8} sx={nodeStyles.typeLabel}>{typeLabel}</Text>
            {children || <Text align='center'>{label}</Text>}
        </Box>

    return executionRunning ?
        nodeContent :
        <HoverCard transition="scale" transitionDuration={100} position="bottom">
            <HoverCard.Target>
                {nodeContent}
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Group>
                    <Tooltip label="Delete" position="bottom" color="gray" offset={25}>
                        <ActionIcon color="red" onClick={() => removeNode(id, reactFlow)}><CgTrash /></ActionIcon>
                    </Tooltip>
                </Group>
            </HoverCard.Dropdown>
        </HoverCard>
}
