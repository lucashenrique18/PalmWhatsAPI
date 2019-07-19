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

module.exports = {
    Mongoose: mongoose,
    Campaign: campaign,
    Mailing: mailing,
    Company: company,
    DispatchConfig: dispatchConfig
}