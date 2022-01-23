import { useContext, useState } from "react"
import { Col, Container, Row, Card, Button } from "react-bootstrap"
import BankContext from "../utils/BankContext"
import { Link, useParams } from "react-router-dom"
import { MdOutlineAddCircle } from "react-icons/md"
import AddNewAccount from "../components/AddNewAccount"
require("./Profile.css")
function Profile(props) {
  const { profile, accounts } = useContext(BankContext)
  const [show, setShow] = useState(false)

  if (!profile) return <h1 style={{ color: "#094067" }}>Loading...</h1>
  return (
    <div style={{ backgroundColor: "#f0efeb" }}>
      <Row>
        <Col
          md="3"
          style={{
            backgroundColor: "#f0efeb",
          }}
        >
          <Col
            md="3"
            style={{
              position: "fixed",
              backgroundColor: "#f0efeb",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: "25px",
            }}
          >
            <h5 style={{ color: "#094067" }}>
              <b>Name:</b>
            </h5>
            <h6 style={{ color: "#094067" }}>
              {profile.firstName} {profile.lastName}
            </h6>

            <hr />

            <h5 style={{ color: "#094067" }}>Phone Number:</h5>
            <h6>+{profile.phoneNumber}</h6>

            <hr />

            <h6 style={{ color: "#094067" }}>
              <b>{profile.email}</b>
            </h6>
          </Col>
        </Col>

        <Col>
          <center>
            <Container>
              <Col style={{ display: "flex", justifyContent: "right", color: "#fffffe" }}>
                <Button className="detailsButton" style={{ margin: "10px" }} onClick={() => setShow(true)}>
                  <MdOutlineAddCircle /> New Account
                </Button>
              </Col>
              <Col md={6}>
                <div>
                  {profile.accounts.map((acc, index) => (
                    <>
                      <Card style={{ backgroundColor: "#f0efeb" }}>
                        <Card.Header style={{ backgroundColor: "#1c2541", color: "white" }}>
                          Accounts Number: {acc.accountNumber}
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            Balance Available: {acc.balance} {acc.currency}
                          </Card.Title>
                          <Card.Text>Account type: {acc.accountType}</Card.Text>

                          <Card.Text>Active Status: {acc.isActive.toString()}</Card.Text>
                          <hr />
                          <Link to={`/accounts/one-account/${acc._id}`}>
                            <Button
                              className="detailsButton" /* style={{ backgroundColor: "#0077b6", color: "#fffffe" }} */
                            >
                              Accounts details
                            </Button>
                          </Link>
                        </Card.Body>
                      </Card>
                      <br />
                      {index < profile.accounts.length - 1 ? <hr /> : null}
                      <br />
                    </>
                  ))}
                </div>
              </Col>
            </Container>
          </center>
        </Col>
      </Row>
      <AddNewAccount show={show} setShow={setShow} />
    </div>
  )
}

export default Profile
