import { useState } from "react"
import personService from '../services/persons'


const PersonForm = ({ persons, setPersons, setNotificationMessage, setNotificationType }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const isAlreadyPerson = (name, number) => {
        return persons.some(person => person.name === name && person.number === number)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (isAlreadyPerson(newName, newNumber)) {
            setNotificationType('success')
            setNotificationMessage(`${newName} with number ${newNumber} is already added to phonebook.`)
            
        } else {
            const exisitingPerson = persons.find(person => person.name === personObject.name)
            if (exisitingPerson) {
                const confirmUser = confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
                if (confirmUser) {
                    personService
                        .update(exisitingPerson.id, personObject)
                        .then(updatedPerson => {
                            setPersons(persons.map(person =>
                                person.id !== exisitingPerson.id ? person : updatedPerson
                            ))
                        })
                        .catch(err => {
                            
                            setNotificationMessage(`Information of ${personObject.name} has already been removed from server`)
                            setNotificationType('success')
                            // setTimeout(() => {
                            //     setNotificationMessage(null)
                            // }, 2500)
                        })
                    setNotificationType('success')
                    setNotificationMessage(`${personObject.name} number is changed`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                    setNewName('')
                    setNewNumber('')
                }
            } else {
                personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationType('success')
                    setNotificationMessage(`${personObject.name} is added.`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
                .catch(error => {
                    setNotificationType('error')
                    setNotificationMessage(error.response.data.error)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 3000)
                })
                
            }
        }
       
        setNewName('')
        setNewNumber('')
    }
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handlePersonChange} />
                </div>
                <div>
                    number <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;