import { useContext } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import BankContext from "../utils/BankContext"

function TransferModal(props) {
  const { show, setShow, accId } = props
  const { transferOperation } = useContext(BankContext)
  return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Form onSubmit={(e) => transferOperation(e, accId)} style={{backgroundColor:"#f0efeb"}}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
             Amount
            </Form.Label>
            <Col md="8">
              <Form.Control type="number" name="amount" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
             Payee Name
            </Form.Label>
            <Col md="8">
              <Form.Control type="text" name="name" required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
             Payee Account Number
            </Form.Label>
            <Col md="8">
              <Form.Control type="number" name="account" required />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" style={{backgroundColor: "#0077b6"}} onClick={() => setShow(false)}>
            Transfer Now
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default TransferModal
