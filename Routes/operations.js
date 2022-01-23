const express = require("express")
const router = express.Router()
const checkToken = require("../middleware/checkToken")
const validateBody = require("../middleware/validateBody")
const { Operation, operationJoi } = require("../Models/Operation")
const { Account } = require("../Models/Account")
const { Card } = require("../Models/Card")
const { User } = require("../Models/User")
const checkAdmin = require("../middleware/checkAdmin")
//________________________________________________________________________________________________________________________________\\
router.get("/operations/my", checkToken, async (req, res) => {
  try {
    let operations = await Operation.find({
      $or: [{ sender: req.userId }, { recipient: req.userId }],
    }).lean()

    if (!operations) {
      res.status(404).send("operation not found")
    }

    res.json(operations)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
router.get("/operations" /* checkAdmin */, async (req, res) => {
  try {
    let operations = await Operation.find().lean()

    if (!operations) {
      res.status(404).send("operation not found")
    }

    res.json(operations)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
router.get("/operations/:id", checkToken, async (req, res) => {
  try {
    let operation = await Operation.findOne({
      _id: req.params.id,
      $or: [{ sender: req.user._id }, { recipient: req.user._id }],
    }).lean()

    if (!operation) {
      res.status(404).send("operation not found")
    }

    res.status(200).json(operation)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
//________________________________________________________Transfer___________________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/transfer/:accId", checkToken, async (req, res) => {
  try {
    const { amount, payeeName, destAccountNumber, sourceAccountId } = req.body
    let sAccountFound = await Account.findById(req.params.accId).lean()

    if (!sAccountFound) return res.status(404).send("sender account not found")
    if (sAccountFound.owner != req.userId) return res.status(403).send("unauthorized action")

    let rAccountFound = await Account.findOne({ accountNumber: destAccountNumber }).lean()
    if (!rAccountFound) return res.status(404).send("recipient account not found")

    const operationBody = new Operation({
      sender: req.userId,
      recipient: rAccountFound.owner,
      payeeName,
      type: "Transfer",
      amount,
      sourceAccountId: req.params.accId,
      destAccountId: rAccountFound._id,
    })

    const rNewBalance = Number(rAccountFound.balance) + Number(amount)
    const sNewBalance = Number(sAccountFound.balance) - Number(amount)

    if (sNewBalance < 0) return res.json("your account doesn't have enough balance")
    if (sAccountFound.accountType == "Regular" && amount > 100000)
      return res
        .status(400)
        .json("You Are Not Allowed to Transfer More Than 100,000 , Due to Your Regular Account Type")
    if (sAccountFound.accountType == "Savings" && amount > 20000)
      return res.status(400).json("You Are Not Allowed to Transfer More Than 20,000 , Due to Your Savings Account Type")
    await operationBody.save()
    await Account.findByIdAndUpdate(rAccountFound._id, {
      $set: { balance: rNewBalance },
      $push: { operations: operationBody._id },
    })
    await Account.findByIdAndUpdate(req.params.accId, {
      $set: { balance: sNewBalance },
      $push: { operations: operationBody._id },
    })
    res.json(operationBody)
  } catch (error) {
    res.json(error.message)
  }
})
//________________________________________________________________________________________________________________________________\\
//______________________________________________________CARD TRANSFER_____________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post(
  "/operations/card/transfer/:cardId",
  checkToken,
  /* validateBody(operationJoi), */ async (req, res) => {
    try {
      const { amount, destAccountNumber, payeeName } = req.body
      let cardFound = await Card.findById(req.params.cardId).lean()
      let sAccountFound = await Account.findById(cardFound.accountId).lean()
      if (!sAccountFound) return res.status(404).send("sender account not found")
      if (sAccountFound.owner != req.userId) return res.status(403).send("unauthorized action")

      let rAccountFound = await Account.findOne({ accountNumber: destAccountNumber }).lean()
      if (!rAccountFound) return res.status(404).send("recipient account not found")

      const operationBody = new Operation({
        payeeName,
        sender: req.userId,
        recipient: rAccountFound.owner,
        type: "Transfer-Card",
        cardId: req.params.cardId,
        sourceAccountId: cardFound.accountId,
        amount,
        destAccountId: rAccountFound._id,
      })

      if (cardFound.cardType == "Debit") {
        const rNewBalance = Number(rAccountFound.balance) + Number(amount)
        const sNewBalance = Number(cardFound.debitBalance) - Number(amount)
        if (sNewBalance < 0) return res.status(400).json("your account doesn't have enough balance")
        if (sAccountFound.accountType == "Regular" && amount > 10000)
          return res
            .status(400)
            .json("You Are Not Allowed to Transfer More Than 10,000, Due to Your Regular Account Type")
        if (sAccountFound.accountType == "Savings" && amount > 5000)
          return res
            .status(400)
            .json("You Are Not Allowed to Transfer More Than 5,000 , Due to Your Savings Account Type")
        await operationBody.save()
        console.log(rNewBalance)
        console.log(sNewBalance)
        await Account.findByIdAndUpdate(rAccountFound._id, {
          $set: { balance: rNewBalance },
          $push: { operations: operationBody._id },
        })
        await Card.findByIdAndUpdate(cardFound._id, {
          $set: { debitBalance: sNewBalance },
          $push: { operations: operationBody._id },
        })
      } else {
        const rNewBalance = Number(rAccountFound.balance) + Number(amount)
        const sNewBalance = Number(sAccountFound.balance) - Number(amount)
        if (sNewBalance < 0) return res.json("your account doesn't have enough balance")
        if (sAccountFound.accountType == "Regular" && amount > 10000)
          return res
            .status(400)
            .json("You Are Not Allowed to Transfer More Than 10,000, Due to Your Regular Account Type")
        if (sAccountFound.accountType == "Savings" && amount > 5000)
          return res
            .status(400)
            .json("You Are Not Allowed to Transfer More Than 5,000 , Due to Your Savings Account Type")
        await operationBody.save()
        await Account.findByIdAndUpdate(rAccountFound._id, {
          $set: { balance: rNewBalance },
          $push: { operations: operationBody._id },
        })
        await Account.findByIdAndUpdate(cardFound, {
          $set: { debitBalance: sNewBalance },
          $push: { operations: operationBody._id },
        })
      }
      await Card.findByIdAndUpdate(req.params.cardId, {
        $push: { operations: operationBody._id },
      })
      res.json(operationBody)
    } catch (error) {
      console.log(error.message)
    }
  }
)
//________________________________________________________________________________________________________________________________\\
//________________________________________________________WITHDRAW_______________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/withdraw/:accId", checkToken, validateBody(operationJoi), async (req, res) => {
  try {
    const { amount } = req.body

    let accountFound = await Account.findById(req.params.accId).lean()
    if (!accountFound) return res.status(404).send("account not found")

    if (accountFound.owner != req.userId) return res.status(403).send("unauthorized action")

    const operationBody = new Operation({
      sourceAccountId: req.params.accId,
      type: "Withdraw",
      amount,
    })
    const newBalance = Number(accountFound.balance) - Number(amount)
    if (accountFound.accountType == "Regular" && amount > 10000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 10,000, Due to Your Regular Account Type")
    if (accountFound.accountType == "Savings" && amount > 5000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 5,000 , Due to Your Savings Account Type")
    if (newBalance < 0) return res.json("your account doesn't have enough balance")
    await operationBody.save()

    await Account.findByIdAndUpdate(req.params.accId, {
      $set: { balance: newBalance },
      $push: { operations: operationBody._id },
    })
    res.json(operationBody)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
//_______________________________________________________CARD WITHDRAW_______________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/card/withdraw/:cardId", checkToken, validateBody(operationJoi), async (req, res) => {
  try {
    const { amount } = req.body

    let cardFound = await Card.findById(req.params.cardId).lean()
    if (!cardFound) return res.status(404).send("card not found")

    let accountFound = await Account.findById(cardFound.accountId).lean()
    if (!accountFound) return res.status(404).send("account not found")

    if (cardFound.owner != req.userId) return res.status(403).send("unauthorized action")

    const operationBody = new Operation({
      type: "Withdraw-Card",
      cardId: req.params.cardId,
      sourceAccountId: cardFound.accountId,
      amount,
    })
    const newBalance = Number(accountFound.balance) - Number(amount)
    if (newBalance < 0) return res.status(400).json("your account doesn't have enough balance")
    if (accountFound.accountType == "Regular" && amount > 10000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 10,000, Due to Your Regular Account Type")
    if (accountFound.accountType == "Savings" && amount > 5000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 2,000 , Due to Your Savings Account Type")
    await operationBody.save()

    await Account.findByIdAndUpdate(cardFound.accountId, {
      $set: { balance: newBalance },
      $push: { operations: operationBody._id },
    })

    await Card.findByIdAndUpdate(req.params.cardId, {
      $push: { operations: operationBody._id },
    })
    res.json(operationBody)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
//_____________________________________________________DEBIT WITHDRAW_________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/debit/withdraw/:cardId", checkToken, validateBody(operationJoi), async (req, res) => {
  try {
    const { amount } = req.body

    let cardFound = await Card.findById(req.params.cardId).lean()
    if (!cardFound) return res.status(404).send("card not found")
    if (cardFound.cardType !== "Debit") return res.status(400).send("card type is not a debit card")
    let accountFound = await Account.findById(cardFound.accountId).lean()
    if (!accountFound) return res.status(404).send("account not found")

    if (cardFound.owner != req.userId) return res.status(403).send("unauthorized action")

    const operationBody = new Operation({
      type: "Debit-Withdraw",
      cardId: req.params.cardId,
      sourceAccountId: cardFound.accountId,
      amount,
    })
    const newBalance = Number(cardFound.debitBalance) - Number(amount)
    if (newBalance < 0) return res.status(400).json("your account doesn't have enough balance")
    if (accountFound.accountType == "Regular" && amount > 10000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 10,000, Due to Your Regular Account Type")
    if (accountFound.accountType == "Savings" && amount > 2000)
      return res.status(400).json("You Are Not Allowed to Withdraw More Than 2,000 , Due to Your Savings Account Type")
    await operationBody.save()

    await Card.findByIdAndUpdate(cardFound._id, {
      $set: { debitBalance: newBalance },
      $push: { operations: operationBody._id },
    })

    res.json(operationBody)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
// ______________________________________________________DEPOSIT____________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/deposit/:accId", checkToken, validateBody(operationJoi), async (req, res) => {
  try {
    const { amount } = req.body

    let accountFound = await Account.findById(req.params.accId).lean()
    if (!accountFound) return res.status(404).send("account not found")

    if (accountFound.owner != req.userId) return res.status(403).send("unauthorized action")

    const operationBody = new Operation({
      sourceAccountId: req.params.accId,
      type: "Deposit",
      amount,
    })
    const newBalance = Number(amount) + Number(accountFound.balance)
    await operationBody.save()
    if (accountFound.accountType == "Regular" && amount > 100000)
      return res.status(400).json("You Are Not Allowed to Deposit More Than 100,000 , Due to Your Regular Account Type")
    if (accountFound.accountType == "Savings" && amount > 10000)
      return res.status(400).json("You Are Not Allowed to Deposit More Than 10,000 , Due to Your Savings Account Type")

    await Account.findByIdAndUpdate(req.params.accId, {
      $set: { balance: newBalance },
      $push: { operations: operationBody._id },
    })

    res.json(operationBody)
  } catch (error) {
    console.log(error)
  }
})
//________________________________________________________________________________________________________________________________\\
//_____________________________________________________CARD DEPOSIT______________________________________________\\
//________________________________________________________________________________________________________________________________\\

router.post("/operations/card/deposit/:cardId", checkToken, validateBody(operationJoi), async (req, res) => {
  try {
    const { amount } = req.body

    let cardFound = await Card.findById(req.params.cardId).lean()
    if (!cardFound) return res.status(404).send("card not found")
    if (cardFound.cardType != "Debit") return res.status(403).send("card type is not a debit card")
    let accountFound = await Account.findById(cardFound.accountId).lean()
    if (!accountFound) return res.status(404).send("account not found")

    if (accountFound.owner != req.userId) return res.status(403).send("unauthorized action")

    const operationBody = new Operation({
      sourceAccountId: cardFound.accountId,
      type: "Debit-Deposit",
      amount,
      cardId: req.params.cardId,
    })
    const newBalance = Number(accountFound.balance) - Number(amount)
    const newDebitBalance = Number(amount) + Number(cardFound.debitBalance)
    if (newBalance < 0) return res.status(400).json("Your Account Does Not Have Enough Balance")
    if (accountFound.accountType == "Regular" && amount > 100000)
      return res.status(400).json("You Are Not Allowed to Deposit More Than 100,000 , Due to Your Regular Account Type")
    if (accountFound.accountType == "Savings" && amount > 10000)
      return res.status(400).json("You Are Not Allowed to Deposit More Than 10,000 , Due to Your Savings Account Type")
    await operationBody.save()

    await Account.findByIdAndUpdate(cardFound.accountId, {
      $set: { balance: newBalance },
    })

    await Card.findByIdAndUpdate(req.params.cardId, {
      $set: { debitBalance: newDebitBalance },
      $push: { operations: operationBody._id },
    })
    res.json(operationBody)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
