const mongoose = require("mongoose")
const faker = require("faker")
const Joi = require("joi")

const cardSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cardNumber: {
      type: String,
    },
    pin: {
      type: String,
    },
    expiryMonth: {
      type: String,
    },
    expiryYear: {
      type: String,
    },
    dailyOnlineLimit: {
      type: Number,
      default: 2000,
    },
    dailyWithdrawalLimit: {
      type: Number,
      default: 2000,
    },
    cardType: {
      type: String,
      enum: ["Credit", "Debit"],
    },
    debitBalance: {
      type: Number,
      default: 0,
    },
    operations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Operation",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const cardJoi = Joi.object({
  cardNumber: faker.finance.creditCardNumber(),
  pin: Joi.string().min(4).max(4).required(),
  expiryMonth: faker.datatype.number({ min: 1, max: 12 }),
  expiryYear: faker.datatype.number({ min: 2021, max: 2030 }),
  cardType: Joi.string().valid("Credit", "Debit"),
})
const Card = mongoose.model("Card", cardSchema)

module.exports.Card = Card
module.exports.cardJoi = cardJoi
