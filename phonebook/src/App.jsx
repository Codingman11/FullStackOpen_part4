import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('') 
  

  //Getting the persons from database
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id) //Finding the person with id 
    //If found person and confirmed then it will delete
    if (personToDelete && confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id).then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationType('success')
          setNotificationMessage(`${personToDelete.name}  is deleted.`)
          setTimeout(() => {
              setNotificationMessage(null)
          }, 3000)
      
        })
        .catch(err => {
          setNotificationType('error')
          setNotificationMessage(err.response.data.error)
        })
      
      
    };
  }


  return (
    <div>
      <Notification notificationMessage={notificationMessage} notificationType={notificationType} noti/>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App