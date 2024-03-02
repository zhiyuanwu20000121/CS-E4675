// const http = require('http')
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const { ObjectId } = require('mongodb');
const fly = require('flyio')
const app = express()
app.use(express.static('public'));
app.use(cors())
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => console.error('Error connecting to MongoDB', error));
morgan.token('post-data', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : '');

// Morgan setup for logging POST requests with specific format
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :post-data', {
  skip: (req, res) => req.method !== 'POST'
}));
app.use(express.json())
let persons = [
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
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
});


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// app.get('/api/persons/:id', (request, response) => {

//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)
//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).send({ error: `No person found with ID ${id}` });
//   }
// })
app.get('/api/persons/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.collection('phonebook').findOne({ _id: ObjectId(id) });
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Invalid ID format' });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;
  // Define a regular expression that matches the rules for valid numbers
  const numberRegex = /^\+?\d{8,}$/;

  if (!name) {
    return response.status(400).json({
      error: 'Name is missing'
    });
  } else if (!number) {
    return response.status(400).json({
      error: 'Number is missing'
    });
  } else if (!numberRegex.test(number)) {
    return response.status(400).json({
      error: 'Number is invalid. It must be at least 8 digits long and may start with a + sign.'
    });
  } else if (persons.some(person => person.name === name)) {
    return response.status(400).json({
      error: 'Name must be unique'
    });
  }
  else {
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
  }
})
app.put('/api/persons/:id', async (req, res) => {
  const { id } = req.params;
  const { number } = req.body;

  try {
    const result = await collection.updateOne(
      { _id: MongoClient.ObjectId(id) },
      { $set: { number } }
    );

    if (result.matchedCount === 0) {
      res.status(404).send({ error: 'No entry found with the given ID' });
    } else {
      res.status(200).send({ message: 'Entry updated successfully' });
    }
  } catch (err) {
    res.status(500).send({ error: 'An error occurred during the update' });
  }
});
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})