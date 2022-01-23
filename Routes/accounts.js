const checkAdmin = require("../middleware/checkAdmin")
const checkToken = require("../middleware/checkToken")
const express = require("express")
const router = express.Router()
const { Account, accJoi } = require("../Models/Account")
const validateBody = require("../middleware/validateBody")
const faker = require("faker")
const account = require("../Models/User")
const { User } = require("../Models/User")
// console.log((faker.finance.account())+(1),(faker.finance.account())+(1))

router.get("/my-accounts", checkToken, async (req, res) => {
  try {
    let accounts = await Account.find({ owner: req.userId }).lean().select("-__v -password").populate("cards")

    res.send(accounts)
  } catch (error) {
    console.log(error)
  }
})

router.get("/accounts", async (req, res) => {
  try {
    let accounts = await Account.find({ id: req.params.id }).lean().populate("cards").populate("owner")

    if (!accounts) return res.status(404).send("Account not found")

    res.send(accounts)
  } catch (error) {
    console.log(error)
  }
})

router.get("/accounts/:accId", async (req, res) => {
  try {
    let accounts = await Account.findOne({ accId: req.params.accId })
      .lean()
      .populate("cards")
      .populate("owner")
      .populate("operations")

    if (!accounts) return res.status(404).send("Account not found")

    res.send(accounts)
  } catch (error) {
    console.log(error)
  }
})

router.post("/accounts", checkToken, validateBody(accJoi), async (req, res) => {
  try {
    const { currency, balance, accountType } = req.body

    let acc = new Account({
      accountNumber: faker.finance.account(8),
      currency,
      balance,
      owner: req.userId,
      accountType,
    })
    await acc.save()
    await User.findByIdAndUpdate(req.userId, { $push: { accounts: acc._id } })
    res.send(acc)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete("/accounts/:accId", checkToken, async (req, res) => {
  try {
    const account = await Account.findByIdAndRemove(req.params.accId)
    if (!account) return res.status(404).json("card not found")

    await Account.findByIdAndRemove(req.params.accId)
    res.json("account removed")
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router
