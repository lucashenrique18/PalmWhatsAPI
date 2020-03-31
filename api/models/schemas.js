const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const campaign = Schema({
  name: { type: String, required: true },
  description: String,
  mailings: [Schema.Types.ObjectId],
  company: { type: [Schema.Types.ObjectId], required: true },
  confDefault: { type: [Schema.Types.ObjectId], required: true },
  type: { type: String, required: true }
});

const mailing = Schema({
  name: { type: String, required: true },
  contact: [
    {
      name: String,
      cpf: String,
      phone: { type: [Number], required: true },
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
      },
      keyfield: [String]
    }
  ],
  mailingDate: {
    type: Date,
    default: Date.now
  },
  fileInfo: {
    name: String,
    path: String,
    size: Number
  },
  amont: Number, //aqui eu tenho que fazer uma função pra verficar a quantidade de contacts, pode ser contact.lenght
  message: {
    mTxt: String,
    nameKey: {
      type: Boolean,
      default: true
    }
  },
  status: { type: Number, default: 0 },
  campaign: Schema.Types.ObjectId
});

const company = Schema({
  name: { type: String, required: true },
  description: String,
  active: { type: Boolean, default: false },
  credits: { type: Number, default: 0 },
  campaignMax: { type: Number, default: 0 },
  simultaneosSend: { type: Number, default: 0 },
  manualSend: {
    type: Boolean,
    default: false
  }
});

const dispatch = Schema({
  queue: { type: Number, required: true },
  description: String,
  cadence: { type: Number, required: true },
  initDt: Date,
  endDt: Date,
  internalNumbers: {
    bool: {
      type: Boolean,
      default: false
    },
    numbers: [Number]
  },
  mailings: [Schema.Types.ObjectId]
});

const history = Schema({
  queue: Number,
  lastStatus: Number,
  idContact: Schema.Types.ObjectId,
  phone: Number,
  mailing: Schema.Types.ObjectId,
  dateStart: Date,
  conversation: [
    {
      dataSend: Date,
      dateReceived: Date,
      dataViewed: Date,
      Msg: String,
      me: Boolean
    }
  ]
});

const user = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value))
        throw new Error({ error: "Invalid Email address" });
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true
  },
  company: Schema.Types.ObjectId
});

module.exports = {
  Mongoose: mongoose,
  Campaign: campaign,
  Mailing: mailing,
  Company: company,
  Dispatch: dispatch,
  History: history,
  User: user
};
