const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://kai:${password}@realmcluster.s0qh3.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person
    .find({})
    .then(persons=> {
        console.log("phonebook:")
        persons.forEach(note => {
            console.log(note.name+" "+note.number)
        })
        mongoose.connection.close()
    })
}
else
{
  const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
    
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
