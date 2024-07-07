const Person = ({ person, handleDelete }) => {

    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
    )
}

const Persons = ({ persons, newFilter, handleDelete }) => {
    //Filtering the input if the person name is found or not -> show it 
    const personsToShow = newFilter ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        : persons;

    
   
    return (
        <div>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} handleDelete={handleDelete} />
            )}

        </div>
    )
}
export default Persons

