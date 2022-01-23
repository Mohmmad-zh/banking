import { useContext } from "react"
import { Form, Col, Row, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import BankContext from "../utils/BankContext"

function Login() {
  const { login } = useContext(BankContext)

  return (
    <center>
      <div className="ms-4">
        <Row style={{ display: "inline-flex" }}>
          <h1>Login</h1>
          <Col className="row d-flex align-items-center justify-content-center">
            <Form className="mt-5" onSubmit={login}>
              <Row style={{ border: "1px solid black" }}>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md="2">
                      Email
                    </Form.Label>
                    <Col md="12">
                      <Form.Control type="email" name="email" required />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md="2">
                      Password
                    </Form.Label>
                    <Col md="12">
                      <Form.Control type="password" name="password" required />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={12}>
                      <Link to="/forgot-password" className="btn btn-outline-primary">
                        Forgot Password
                      </Link>
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group as={Row} className="my-4">
                <Col md={12}>
                  <Button style={{ backgroundColor: "#0077b6" }} type="submit">
                    Login
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </center>
  )
}

export default Login
