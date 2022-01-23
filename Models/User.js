const mongoose = require("mongoose")
const Joi = require("joi")
const { required } = require("joi")
passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
  firstName: String,

  middleName: String,

  lastName: String,

  email: String,

  emailVerified: {
    type: Boolean,
    default: false,
  },

  password: String,

  phoneNumber: String,

  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  accounts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Account",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  sourceOfIncome: {
    type: String,
    enum: [
      "EmploymentIncome",
      "InheritanceOrTrust",
      "InvestmentIncome",
      "RetirementIncome",
      "Unemployment",
      "HouseholdIncome",
      "SocialSecurity",
    ],
  },
  employmentStatus: {
    type: String,
    enum: ["Employed", "Retired", "SelfEmployed", "Student", "Unemployed"],
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  monthlyIncome: {
    type: Number,
  },
  cards: {
    type: mongoose.Types.ObjectId,
    ref: "Card",
  },
})

const signupJoi = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity({
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    sympol: 1,
    requirementCount: 2,
  }),
  monthlyIncome: Joi.number().required(),
  phoneNumber: Joi.string().min(12).max(12),
  monthlyIncome: Joi.number().required(),
  accountType: Joi.string().valid("Regular", "Savings", "Premium"),
  address: Joi.string().max(50).required(),
  city: Joi.string().min(2).max(100).required(),
  employmentStatus: Joi.string().valid("Employed", "Retired", "SelfEmployed", "Student", "Unemployed").required(),
  sourceOfIncome: Joi.string()
    .valid(
      "EmploymentIncome",
      "InheritanceOrTrust",
      "InvestmentIncome",
      "RetirementIncome",
      "Unemployment",
      "HouseholdIncome",
      "SocialSecurity"
    )
    .required(),
  zipCode: Joi.string().min(5).max(10).required(),
})

const loginJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
})

const profileJoi = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  password: passwordComplexity({
    min: 6,
    lowerCase: 1,
    upperCase: 1,
    sympol: 1,
    requirementCount: 2,
  }),
  phoneNumber: Joi.string().min(12).max(12),
  accounts: Joi.array(),
})

const User = mongoose.model("User", userSchema)

module.exports.User = User
module.exports.signupJoi = signupJoi
module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
