import { useContext } from "react"
import BankContext from "../utils/BankContext"
import { Table, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
require("./MyCards.css")
function Cards() {
  const { profile } = useContext(BankContext)
  if (!profile) return <h1>Loading...</h1>

  return (
    <Table striped bordered hover style={{ backgroundColor:"#778da9",color:"white" }}>
      <thead>
        <tr>
          <th>Card Number</th>

          <th>Type</th>

          <th>Balance</th>

          <th>Account Number</th>
        </tr>
      </thead>
      {profile.accounts.map(account =>
        account.cards.map(card => (
          <tbody>
            <tr>
              <td style={{color:"white"}}>{card.cardNumber}</td>
              <td style={{color:"white"}}>{card.cardType}</td>
              <td style={{color:"white"}}>{card.debitBalance}</td>
              <td style={{color:"white"}}>{account.accountNumber}</td>
              <center>
                <td>
                  <Link to={`/one-card/${account._id}/${card._id}`}>
                    <Button className="viewButton" style={{  padding: "3px 30px" }}>View</Button>
                  </Link>
                </td>
              </center>
            </tr>
          </tbody>
        ))
      )}
    </Table>
  )
}

export default Cards
