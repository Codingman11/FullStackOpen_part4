const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
	Person.find({})
		.then(persons => {
			res.json(persons)
		})
})

personsRouter.get('/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(err => next(err))
})

personsRouter.post('/', (request, response, next) => {
	const body = reqest.body

	if (!body.name || !body.number) {
		return response.status(404).json({
			error: 'The name or number is missing'
		})
	}
	const person = new Person({
		'name': body.name,
		'number': body.number
	})

	person.save()
		.then(savedPerson => {
			console.log(`added ${savedPerson.name} phone ${savedPerson.number} to phonebook`)
			res.json(savedPerson)
		})
		.catch(err => next(err))
})

personsRouter.delete('/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(err => next(err))
})

personsRouter.put('/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id, 
		{ name, number }, 
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(err => next(err))

})

module.exports = personsRouter