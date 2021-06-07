import React from 'react'

const Numbers = ({ personsToShow }) => (
    <>
        {personsToShow.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
    </>
)

export default Numbers
