import { useContext, useState } from "react"
import BankContext from "../utils/BankContext"
import { Table, Card, ListGroup, Col, Row, Button } from "react-bootstrap"
import Moment from "react-moment"
import { Link, useParams } from "react-router-dom"
import CardAddModal from "../components/AddCardModal"
import DepositModal from "../components/DepositModal"
import WithdrawModal from "../components/WithdrawModal"
import TransferModal from "../components/TransferModal"
import AccountDeleteModal from "../components/AccountDeleteModal"
require("./OneAccount.css")
function OneAccount(props) {
  const { card } = props
  const { accId } = useParams()
  const { profile } = useContext(BankContext)
  const [deleteShow, setDeleteShow] = useState(false)
  const [cardShow, setCardShow] = useState(false)
  const [depositShow, setDepositShow] = useState(false)
  const [withdrawShow, setWithdrawShow] = useState(false)
  const [transferShow, setTransferShow] = useState(false)

  const account = profile?.accounts.find(acc => acc._id == accId)
  return (
    <>
      <center>
        <center>
          <Col md={6} style={{ margin: "10px" }}>
            <Button className="withdraw" onClick={() => setWithdrawShow(true)}>
              Withdraw
            </Button>{" "}
            <Button className="transfer" variant="outline-info" onClick={() => setTransferShow(true)}>
              Transfer
            </Button>{" "}
            <Button className="deposit" variant="outline-success" onClick={() => setDepositShow(true)}>
              Deposit
            </Button>
            <hr />
          </Col>
        </center>
        <Col md={6}>
          <Card className="text-center" style={{ backgroundColor: "#f0efeb" }}>
            <Card.Header style={{ color: "white", backgroundColor: "#1c2541" }}>Account Details</Card.Header>
            <Card.Body>
              <Card.Title>
                Balance: {account?.balance} {account?.currency}
              </Card.Title>
              <Card.Text>
                Acccount Type: {account?.accountType}
                <br />
                <br />
                <Link to="/cards" style={{ textDecoration: "none" }}>
                  <Button className="cardsLink"> Cards: {account?.cards.length}</Button>
                </Link>
              </Card.Text>
            </Card.Body>
            <center style={{ backgroundColor: "#f0efeb" }}>
              <Button className="createButton" style={{ margin: "10px" }} onClick={() => setCardShow(true)}>
                Create Card
              </Button>
            </center>
            <Button style={{ margin: "5px" }} variant="outline-danger" onClick={() => setDeleteShow(true)}>
              Delete
            </Button>

            <Card.Footer style={{ backgroundColor: "#415a77", color: "white" }}>
              Account Number: {account?.accountNumber}
            </Card.Footer>
          </Card>
        </Col>
      </center>
      <br />
      <hr />
      <center>
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
              {account?.operations.map(operation => (
                <tr>
                  <td style={{ color: "white" }}>{operation.type}</td>
                  <td style={{ color: "white" }}>{operation.amount}</td>
                  <td style={{ color: "white" }}>
                    <Moment>{operation.date}</Moment>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </center>
      <AccountDeleteModal show={deleteShow} setShow={setDeleteShow} accId={accId} />
      <CardAddModal show={cardShow} setShow={setCardShow} accId={accId} />
      <DepositModal show={depositShow} setShow={setDepositShow} accId={accId} />
      <WithdrawModal show={withdrawShow} setShow={setWithdrawShow} accId={accId} />
      <TransferModal show={transferShow} setShow={setTransferShow} accId={accId} />
    </>
  )
}

export default OneAccount
