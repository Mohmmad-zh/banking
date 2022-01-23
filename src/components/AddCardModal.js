import { useContext } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import BankContext from "../utils/BankContext"

function CardAddModal(props) {
  const { show, setShow, accId } = props
  const { addCard } = useContext(BankContext)
  return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Form onSubmit={(e) => addCard(e, accId)} style={{backgroundColor:"#f0efeb"}}>
        <Modal.Header closeButton>
          <Modal.Title>Create Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Pin
            </Form.Label>
            <Col md="8">
              <Form.Control type="text" name="pin" required />
            </Col>
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
          <Form.Check label="Credit" name="cardType" type={"radio"} value="Credit" />
          <Form.Check label="Debit" name="cardType" type={"radio"} value="Debit" />
        </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" style={{backgroundColor: "#0077b6"}} onClick={() => setShow(false)}>
            Add card
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CardAddModal
