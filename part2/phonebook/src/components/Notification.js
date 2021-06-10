import React from 'react'

const Notification = ({isError, message}) => {
    // only render when necessary
    if (!message) { return null; }

    const style = {
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={style}>{message}</div>
    )
}

export default Notification