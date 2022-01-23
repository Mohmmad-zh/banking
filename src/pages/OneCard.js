import { useContext, useState } from "react"
import BankContext from "../utils/BankContext"
import { Table, Card, Col, Row, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import CardTransfer from "../components/CardTransfer"
import CardWithdraw from "../components/CardWithdraw"
import DebitDeposit from "../components/DebitDeposit"
import Moment from "react-moment"
import CardDeleteModal from "../components/CardDeleteModal"
require("./OneCard")
function OneCard() {
  const { cardId, accId } = useParams()
  const { profile } = useContext(BankContext)
  const [cardDepositShow, setCardDepositShow] = useState(false)
  const [cardWithdrawShow, setCardWithdrawShow] = useState(false)
  const [cardTransferShow, setCardTransferShow] = useState(false)
  const [deleteShow, setDeleteShow] = useState(false)
  if (!profile) return <h1>Loading...</h1>

  const accountFound = profile?.accounts.find(account => account._id == accId)
  const card = accountFound.cards.find(card => card._id == cardId)

  return (
    <center>
      <br />
      <Col md={6}>
        <Card className="text-center" style={{ backgroundColor: "#f0efeb" }}>
          <Card.Header style={{ color: "white", backgroundColor: "#1c2541" }}>Card Details</Card.Header>
          <>
            <Card.Body>
              <Card.Title>Card Type: {card.cardType}</Card.Title>
              <Card.Text>
                Card Balance: {card.debitBalance} <br />
              </Card.Text>
              <Card.Text>
                Account Balance: {accountFound.balance} <br />
              </Card.Text>
              <hr />
              <Col style={{ margin: "5px" }}>
                <h4>Card Operations</h4>
                <br />
                <Button className="withdraw" onClick={() => setCardWithdrawShow(true)}>
                  Withdraw
                </Button>{" "}
                <Button className="transfer" onClick={() => setCardTransferShow(true)}>
                  Transfer
                </Button>{" "}
                {card.cardType == "Debit" ? (
                  <Button className="deposit" onClick={() => setCardDepositShow(true)}>
                    Deposit
                  </Button>
                ) : null}
              </Col>
            </Card.Body>
            <Button style={{ margin: "5px" }} variant="outline-danger" onClick={() => setDeleteShow(true)}>
              Delete
            </Button>

            <Card.Footer style={{ backgroundColor: "#415a77", color: "white" }}>
              Card Number: {card.cardNumber}{" "}
            </Card.Footer>
          </>
        </Card>
      </Col>
      <br />

      <Col md={6}>
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "6px", backgroundColor: "#778da9", color: "white" }}
        >
          <thead style={{ color: "white" }}>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {card.operations?.map(operation => (
              <tr>
                <td style={{ color: "white" }}>{operation.type}</td>
                <td style={{ color: "white" }}> {operation.amount} </td>
                <td style={{ color: "white" }}>
                  <Moment>{operation.date}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
      </Col>

      <hr />

      <DebitDeposit show={cardDepositShow} setShow={setCardDepositShow} cardId={cardId} />
      <CardWithdraw show={cardWithdrawShow} setShow={setCardWithdrawShow} card={card} />
      <CardDeleteModal show={deleteShow} setShow={setDeleteShow} cardId={cardId} />
      <CardTransfer show={cardTransferShow} setShow={setCardTransferShow} cardId={cardId} />
    </center>
  )
}
export default OneCard
