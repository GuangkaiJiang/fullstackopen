const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

/*let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/

app.use(express.json())
app.use(express.static('build'))

//app.use(morgan('tiny'))
morgan.token('body',req=>JSON.stringify(req.body))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
},{skip: function(req,res){return req.method!='POST'}})
)

const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons=> {
      res.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p></div>`)
    })
    //res.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p></div>`)
  })

function getRandomID() {
return Math.floor(Math.random() * 99999);
}

app.post('/persons', (req, res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }
  /*if(persons.map(p=>p.name).includes(body.name))
  {
    return res.status(400).json({ 
    error: 'name must be unique' 
    })
  }*/
  const person = new Person({
    //id: getRandomID(),
    name: body.name,
    number: body.number,
  })

  //console.log(person)
  //persons = persons.concat(person)
  //res.json(person)
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    res.json(result)
  })
})

app.get('/persons', (req, res) => {
  //res.json(persons)
  Person
    .find({})
    .then(persons=> {
      res.json(persons)
    })
})

app.delete('/persons/:id', (req, res) => {
  //const id = Number(req.params.id)
  //persons = persons.filter(person => person.id !== id)
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  })
  //res.status(204).end()
})

app.get('/persons/:id', (req, res) => {
  //const id = Number(req.params.id)
  //const person = persons.find(person => person.id === id)
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
  .catch(err=>res.status(404).end())
  //if (person) {
  //  res.json(person)
  //} else {
  //  res.status(404).end()
  //}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})