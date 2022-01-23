const mongoose = require("mongoose")
const Joi = require("joi")

const accountSchema = new mongoose.Schema(
  {
    accountType: {
      type: String,
      enum: ["Regular", "Savings", "Premium"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    accountNumber: {
      type: String,
    },
    currency: {
      type: String,
      default: "SAR",
    },

    balance: {
      type: Number,
      default: 0,
    },
    cards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Card",
      },
    ],

    operations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Operation",
      },
    ],
  },
  {
    timestamps: true,
  }
)

const accJoi = Joi.object({
  accountNumber: Joi.string(),
  accountType: Joi.string().required(),
  currency: Joi.string().min(1).max(20),

  phoneNumber: Joi.string().min(12).max(12),
})

const Account = mongoose.model("Account", accountSchema)

module.exports.Account = Account
module.exports.accJoi = accJoi
