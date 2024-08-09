require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const personRouter = require('./controllers/person')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app







// morgan.token('body', req => {
//   return JSON.stringify(req.body)
// })


// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     tokens['body'](req)
//   ].join(' ')
// }))
