const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin-elijah:${password}@cluster0.fuhtx.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
    process.exit(0);
  });
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date(),
});

person.save().then((result) => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
