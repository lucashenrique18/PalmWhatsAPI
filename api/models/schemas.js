const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaign = Schema({
    name: String,
    description: String,
    mailings: [Schema.Types.ObjectId],
    company: Schema.Types.ObjectId,
    confDefault: Schema.Types.ObjectId,
    type: String,
});

const mailing = Schema({
    name: String,
    contact: [{
      name: String,
      cpf: String,
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
      },
      keyfield: [String],
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

const dispatch = Schema({
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
});

const history = Schema({
  queue: Number,
  lastStatus: Number,
  idContact: Schema.Types.ObjectId,
  phone: Number,
  mailing: Schema.Types.ObjectId,
  dateStart: Date,
  conversation: [{
    dataSend: Date,
    dateReceived: Date,
    dataViewed: Date,
    Msg: String,
    me: Boolean,
  }]

})

module.exports = {
    Mongoose: mongoose,
    Campaign: campaign,
    Mailing: mailing,
    Company: company,
    Dispatch: dispatch,
    History: history
}
