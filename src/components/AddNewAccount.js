import { useContext } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import BankContext from "../utils/BankContext"

function AddNewAccount(props) {
    const { addAccount } = useContext(BankContext)
    const { show, setShow } = props
    
  return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Form onSubmit={addAccount} style={{backgroundColor:"#f0efeb"}}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} className="mb-3">
            <Form.Check label="Regular" name="accountType" inline type={"radio"} value="Regular" />
            <Form.Check label="Savings" name="accountType" inline type={"radio"} value="Savings" />
            <Form.Check label="Premium" name="accountType" inline type={"radio"} value="Premium" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" style={{backgroundColor: "#0077b6"}} onClick={() => setShow(false)}>
            Add Account
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddNewAccount
