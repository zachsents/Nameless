
export const inner = theme => ({
    position: 'relative',
    border: "1px solid black",
    borderRadius: 6,
    padding: "18px 50px",
    backgroundColor: "white",
    ".selected &": {
        outline: '2px solid ' + theme.colors.yellow[2],
    }
})

export const typeLabel = theme => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -100%)',
    textTransform: "capitalize",
})

export const valueHandle = theme => ({
    // background: theme.colors.blue[6],
    background: theme.colors.dark[3],
})

export const actionHandle = theme => ({
    background: theme.colors.red[6]
})