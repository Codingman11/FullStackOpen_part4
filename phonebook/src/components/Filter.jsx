import { useState } from 'react'
import personService from '../services/persons'
const Filter = ({newFilter, setNewFilter}) => {
    
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
      }

    return (
        <div>
            filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter;