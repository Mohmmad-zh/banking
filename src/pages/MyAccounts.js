import { useContext } from "react"
import BankContext from "../utils/BankContext"
import { Table } from "react-bootstrap"
import Moment from "react-moment"


function Accounts() {
  const { profile } = useContext(BankContext)
  if (!profile) return <h1>Loading...</h1>

  return (
    <Table striped bordered hover style={{ backgroundColor:"#778da9",color:"white" }}>
      <thead style={{color:"white"}}>
        <tr>
          <th>Account Number</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      {profile.accounts.map(account => (
        <tbody>
          {account.operations.map(operation => (
              <>
            <tr>
              <td style={{color:"white"}}>{account.accountNumber}</td>
              <td style={{color:"white"}}>{operation.type}</td>
              <td style={{color:"white"}}>{operation.amount}</td>
              <td style={{color:"white"}}>
                <Moment>{operation.date}</Moment>
              </td>
          
          
            </tr>
            
            </>
          ))}
        </tbody>
      ))}
    </Table>
  )
}

export default Accounts
