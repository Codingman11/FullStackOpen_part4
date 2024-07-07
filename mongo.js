const mongoose = require('mongoose')
require('dotenv').config()
if (process.argv.length < 3) {
  console.log('give name and number as argument')
  process.exit(1)
}



const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[2],
  number: process.argv[3],
})

// person.save().then(result => {
//   console.log(`added ${person.name} number ${person.number} to phonebook`)
//   mongoose.connection.close()
// })

Person.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(person => {
    console.log(`${person.name} ${[person.number]}`)
  })
  mongoose.connection.close()
})