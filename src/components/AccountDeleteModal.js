import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import BankContext from "../utils/BankContext"


function AccountDeleteModal(props) {
  const { deleteAccount } = useContext(BankContext)
  const { show, setShow, accId } = props
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this Account ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => deleteAccount(accId)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AccountDeleteModal
