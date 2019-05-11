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


//? coloquei esses schemas aqui mas ta errado, acredito que deveriam estar la nos models, tenho que definir os exports de acordo com os chamados dos DAO. Veremos...

const Schema = mongoose.Schema;

const campaignSchema = Schema({
  name: String,
  description: String,
  mailings: [Schema.Types.ObjectId],
  company: Schema.Types.ObjectId,
  confDefault: Schema.Types.ObjectId,
  type: String,
});

const mailingSchema = Schema({
  name: String,
  contact: [{
    name: String,
    cpf: Number,
    phone: [Number],
    binded: {
      type: Boolean,
      default: false
    },
    wchecked: {
      dateChecked: Date,
      verified: {
        type: Boolean,
        default: false
      }
    },
    statusSend: {
      type: Number,
      default: 0
    }, //aqui poderia ser do tipo status_env que é outro schema
    keyfield: [],
  }],
  mailingDate: {
    type: Date,
    default: Date.now
  },
  amont: Number, //aqui eu tenho que fazer uma função pra verficar a quantidade de contacts, pode ser contact.lenght
  message: {
    mTxt: String,
    nameKey: {
      type: Boolean,
      default: true
    },
  },
  status: {type: Number, default: 0},
  campaign: Schema.Types.ObjectId
});

const dispatchConfig = Schema({
  queue: Number,
  description: String,
  cadence: Number,
  initDt: Date,
  endDt: Date,
  internalNumbers: {
    bool: {
      type: Boolean,
      default: false
    },
    numbers: [Number]
  },
  mailings: [Schema.Types.ObjectId],
})

const company = Schema({
  name: String,
  description: String,
  active: Boolean,
  credits: Number,
  campaignMax: Number,
  simultaneosSend: Number,
  manualSend: {
    type: Boolean,
    default: false
  }
});


module.exports = {
  Run: run,
  Mongoose: mongoose,
  CampaignSchema: campaignSchema,
  MailingSchema: mailingSchema,
  Company: company,
  DispatchConfig: dispatchConfig
};

module.exports.close = () => {
  mongoose.connection.close(function (err) {
    if (err)
      console.log("ERRO -- " + err);
  });
}