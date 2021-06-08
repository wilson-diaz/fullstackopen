import React from 'react'

const Numbers = ({ personsToShow, handleDelete }) => (
    <>
        {personsToShow.map(p => (
            <p key={p.id}>
                {p.name} {p.number} 
                <button onClick={handleDelete(p.id)}>delete</button>
            </p>
        ))}
    </>
)

export default Numbers
