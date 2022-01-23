const mongoose = require("mongoose")
const Joi = require("joi")
const operationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    payeeName: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Paid", "Rejected"],
    },
    reference: {
      type: String,
      // trim: true,
      minlength: 2,
      maxlength: 20,
    },
    sourceAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    cardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    destAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    type: {
      type: String,
      enum: ["Transfer", "Withdraw", "Deposit", "Transfer-Card", "Withdraw-Card", "Debit-Deposit", "Debit-Withdraw"],
    },
  },
  {
    timestamps: true,
  }
)

const operationJoi = Joi.object({
  payeeName: Joi.string().min(2).max(100),
  amount: Joi.number(),
  //   destAccountId: Joi.number()
})

const Operation = mongoose.model("Operation", operationSchema)

module.exports.Operation = Operation
module.exports.operationJoi = operationJoi
