require('dotenv').config();
const mongoose = require('mongoose');
const dbName = 'whatsdb';

const uri = `mongodb://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;

mongoose.Promise = Promise
mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})
mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})
mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})
mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})
mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
})

const run = async () => {
    await mongoose.connect(uri, {useNewUrlParser: true, autoReconnect: true});
}
run().catch(error => console.error(error));

const Schema = mongoose.Schema;

const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

module.exports = {Mongoose: mongoose, PersonSchema: personSchema, StorySchema: storySchema };
