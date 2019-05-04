require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb://${process.env.USERN}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;

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
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true
  });
}
const Schema = mongoose.Schema;

const campaignSchema = Schema({
  name: String,
  description: String,
  mailings: [],
});

const mailingSchema = Schema({
  name: String,
  contact: {
    nome: String,
    cpf: Number,
    phone: [Number],
    binded: {type: Boolean, default: false},
    wchecked: {
      dateChecked: Date,
      verified: {type: Boolean, default: false}
    },
    status_env: {
      type: Number,
      default: 0
    } //aqui poderia ser do tipo status_env que é outro schema
  },
  mDate: {
    type: Date,
    default: Date.now
  },
  _mailingId: Schema.Types.ObjectId,
  amont: {
    type: Number,
  }
});

const envio = Schema({

})

module.exports = {
  Run: run,
  Mongoose: mongoose,
  CampaignSchema: campaignSchema,
  MailingSchema: mailingSchema
};

module.exports.close = () => {
  mongoose.connection.close(function (err) {
    if (err)
      console.log("ERRO -- " + err);
  });
}