import { useContext } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import BankContext from "../utils/BankContext"

function CardWithdraw(props) {
  const { show, setShow, card } = props
  const { CardWithdrawOp, debitWithdraw } = useContext(BankContext)
  return (
    <Modal show={show} onHide={() => setShow(false)} >
      <Form onSubmit={(e) => card.cardType =="Credit" ? CardWithdrawOp(e, card._id) : debitWithdraw(e, card._id)} style={{backgroundColor:"#f0efeb"}}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" style={{backgroundColor: "#0077b6"}} onClick={() => setShow(false)}>
            Withdraw Now
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default CardWithdraw
