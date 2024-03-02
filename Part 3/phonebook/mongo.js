const { MongoClient } = require('mongodb');

const password = process.argv[2];
const dbName = 'fullstack'; // Replace with your actual database name
const uri = `mongodb+srv://fullstack:${password}@cluster0.8i03nja.mongodb.net/${dbName}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('phonebook');
  
    try {
      if (process.argv.length === 5) {
        // Add or Update an entry
        const name = process.argv[3];
        const number = process.argv[4];
        const existingEntry = await collection.findOne({ name });
  
        if (existingEntry) {
          // Update the existing entry
          await collection.updateOne({ name }, { $set: { number } });
          console.log(`Updated ${name}'s number to ${number}`);
        } else {
          // Add a new entry
          await collection.insertOne({ name, number });
          console.log(`Added ${name} with number ${number}`);
        }
      } else if (process.argv.length === 4 && process.argv[2] === 'delete') {
        // Delete an entry
        const name = process.argv[3];
        const result = await collection.deleteOne({ name });
  
        if (result.deletedCount === 0) {
          console.log(`No entry found with the name ${name}`);
        } else {
          console.log(`Deleted ${name} from the phonebook`);
        }
      } else if (process.argv.length === 3) {
        // List all entries
        const entries = await collection.find({}).toArray();
        console.log('Phonebook:');
        entries.forEach(entry => console.log(entry.name, entry.number));
      } else {
        console.log('Please provide the correct number of arguments');
      }
    } catch (err) {
      console.error('Error with MongoDB operation', err);
    } finally {
      await client.close();
    }
  }
  
  main().catch(console.error);
  
  