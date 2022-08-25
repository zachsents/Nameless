import { Stack, Group, useMantineTheme, Box } from '@mantine/core'
import React from 'react'
import { Handle, Position } from 'react-flow-renderer'
import { DataType } from '../../dataTypes'
import * as nodeStyles from "./nodeStyles"

export default function HandleGroup({ position, dataType, type, handles, hideLabel }) {

    const theme = useMantineTheme()

    const handleStyle =
        dataType == DataType.Value ? nodeStyles.valueHandle(theme) :
            dataType == DataType.Signal ? nodeStyles.actionHandle(theme) : {}

    const handleComponents = handles?.map(handle =>
        <Box sx={handleWrapperStyle} key={handle}>
            <Handle
                type={type}
                id={`<${dataType}>${handle}`}
                position={position}
                data-label={hideLabel ? "" : handle}
                style={handleStyle}
            />
        </Box>
    )

    return (
        position == Position.Left || position == Position.Right ?
            <Stack spacing={0} sx={stackStyle(position)}>
                {handleComponents}
            </Stack> :
            <Group spacing={0} position='center' sx={groupStyle(position)}>
                {handleComponents}
            </Group>
    )
}

const handleOffset = 16
const hoverPadding = 10

const commonStyle = {
    position: 'absolute',
    zIndex: 10,
}
const stackStyle = position => theme => ({
    ...commonStyle,
    top: '50%',
    transform: "translateY(-50%)",
    left: position == Position.Left ? -handleOffset : 'auto',
    right: position == Position.Right ? -handleOffset : 'auto',
})
const groupStyle = position => theme => ({
    ...commonStyle,
    width: '100%',
    left: '50%',
    transform: "translateX(-50%)",
    top: position == Position.Top ? -handleOffset : 'auto',
    bottom: position == Position.Bottom ? -handleOffset : 'auto',
})

const handleWrapperStyle = {
    
    padding: hoverPadding,
    borderRadius: '100%',
    "&:hover .react-flow__handle": {
        transform: "scale(2)",
    }
}