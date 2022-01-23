const express = require("express")
const checkToken = require("../middleware/checkToken")
const validateBody = require("../middleware/validateBody")
const router = express.Router()
const { Card, cardJoi } = require("../Models/Card")
const { Account, acc, account } = require("../Models/Account")
const faker = require("faker")

router.get("/cards/my", checkToken, async (req, res) => {
  try {
    let cards = await Card.find({ owner: req.user._id }).lean().populate("operations").populate("owner")

    if (!cards) return res.status(404).send("card not found")

    res.status(200).json(cards)
  } catch (error) {
    console.log(error)
  }
})

router.get("/cards", checkToken, async (req, res) => {
  try {
    let cards = await Card.find().lean().populate("operations").populate("owner").populate("accountId")

    if (!cards) return res.status(404).send("card not found")

    res.json(cards)
  } catch (error) {
    res.send(error)
  }
})

router.get("/cards/:cardId", checkToken, async (req, res) => {
  try {
    let cards = await Card.find().populate("operations").populate("owner")

    if (!cards) return res.status(404).send("card not found")

    res.json(cards)
  } catch (error) {
    console.log(error)
  }
})

router.post("/cards/:accId", checkToken, validateBody(cardJoi), async (req, res) => {
  try {
    const { pin, cardType, debitBalance } = req.body

    let accountFound = await Account.findById(req.params.accId).lean()
    // if( accountFound.accountType == "Premium")  (debitBalance= 10000, cardType= "Debit", pin= faker.finance.mask(4))
    if (!accountFound) return res.status(404).send("account not found")
    // const cardFound = await Card.findOne({ cardNumber })
    // if (cardFound) return res.status(400).send("Card already exist")

    const crd = new Card({
      owner: req.userId,
      cardNumber: faker.finance.creditCardNumber(),
      pin,
      expiryMonth: faker.datatype.number({ min: 1, max: 12 }),
      expiryYear: faker.datatype.number({ min: 2021, max: 2030 }),
      accountId: req.params.accId,
      cardType,
      debitBalance,
    })
    await crd.save()
    await Account.findByIdAndUpdate(req.params.accId, { $push: { cards: crd._id } })
    res.send(crd)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete("/cards/:cardId", checkToken, async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId)
    if (!card) return res.status(404).json("card not found")

    await Card.findByIdAndRemove(req.params.cardId)
    res.json("card removed")
  } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router
