import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import BankContext from "../utils/BankContext"

function CardDeleteModal(props) {
  const { deleteCard } = useContext(BankContext)
  const { show, setShow, cardId } = props
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this Card ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => deleteCard(cardId)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardDeleteModal
