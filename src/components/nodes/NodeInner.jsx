import { Box, Text } from '@mantine/core'
import React from 'react'
import * as nodeStyles from "./nodeStyles"

export default function NodeInner({ label, typeLabel, children }) {
    return (
        <Box sx={nodeStyles.inner}>
            <Text size={8} sx={nodeStyles.typeLabel}>{typeLabel}</Text>
            {children || <Text align='center'>{label}</Text>}
        </Box>
    )
}
