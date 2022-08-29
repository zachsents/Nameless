import { ActionIcon, Box, ColorSwatch, Group, HoverCard, Popover, Text, Tooltip, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'
import * as nodeStyles from "./nodeStyles"

import { CgTrash } from "react-icons/cg"
import { removeNode } from '../../util'
import { useReactFlow } from 'react-flow-renderer'

export default function NodeInner({ label, typeLabel, children, selected, id }) {

    const reactFlow = useReactFlow()
    const theme = useMantineTheme()

    const [color, setColor] = useState("white")

    return (
        <HoverCard transition="scale" transitionDuration={100} position="top" zIndex={1000}>
            <HoverCard.Target>
                <Box sx={boxStyle(color)}>
                    <Text size={8} sx={nodeStyles.typeLabel}>{typeLabel}</Text>
                    {children || <Text align='center'>{label}</Text>}
                </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Group>
                    <Popover position="top" withArrow offset={20} styles={popoverStyles}>
                        <Popover.Target>
                            <ColorSwatch sx={swatchStyle} color={theme.colors[color]?.[5] || "white"} />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Group position="center">
                                {["white", ...Object.keys(theme.colors).slice(1)].map(color => (
                                    <ColorSwatch 
                                    color={theme.colors[color]?.[5] || color} 
                                    onClick={() => setColor(color)}
                                    sx={swatchStyle} 
                                    key={color} 
                                    />
                                ))}
                            </Group>
                        </Popover.Dropdown>
                    </Popover>
                    <Tooltip label="Delete" position="bottom" color="gray" offset={25}>
                        <ActionIcon color="red" onClick={() => removeNode(id, reactFlow)}><CgTrash /></ActionIcon>
                    </Tooltip>
                </Group>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}

const popoverStyles = theme => ({
    dropdown: {
        width: 250
    }
})

const swatchStyle = theme => ({
    cursor: "pointer",
    display: "inline-block",
})

const boxStyle = color => theme => ({
    position: 'relative',
    border: "1px solid black",
    borderRadius: 6,
    padding: "18px 50px",
    backgroundColor: theme.colors[color]?.[3] || "white",
    ".selected &": {
        outline: '2px solid ' + theme.colors.yellow[2],
    }
})