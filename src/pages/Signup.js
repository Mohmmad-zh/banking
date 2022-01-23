import { useContext } from "react"
import { Form, Col, Row, Button } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import BankContext from "../utils/BankContext"

function SignUp() {
  const { signup, addAccounts, addCard } = useContext(BankContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const plan = searchParams.get('plan')

  return (
    <center>
      <div className="ms-4 mt-5">
        <h1 style={{ textDecoration: "underline" }}>Register Application</h1>
        <Row style={{ display: "inline-flex" }}>
          <Col className="row d-flex align-items-center justify-content-center">
            <Form className="mt-5" onSubmit={addAccounts} onSubmit={signup} >
            <Row style={{border:"1px solid black"}}>
<Col>
              <h4>Personal Information</h4>
              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control name="firstName" type="text" placeholder="First Name *" required />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control name="middleName" type="text" placeholder="Middle Name (Optional)" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control type="text" name="lastName" placeholder="Last Name *" required />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control type="email" name="email" placeholder="Email *" required />
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
                <Col md="12">
                  <Form.Control type="text" name="phoneNumber" placeholder="Phone Number *" required />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control type="text" name="city" placeholder="City *" required />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md="2">
                  Address
                </Form.Label>
                <Col md="12">
                  <Form.Control type="text" name="address" placeholder="Apartment #, Unit #, etc." required />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control type="text" name="zipCode" placeholder="Zip Code *" required />
                </Col>
              </Form.Group>
              <br />
              <hr />
              <Form.Group as={Row} className="mb-3" label="choose a source of income">
                <h4>{`Employment & Finances`}</h4>
                <Col md="12">
                  <Form.Select area-label="choose a source of income" name="sourceOfIncome">
                    <option>- choose a source of income -</option>
                    <option value="EmploymentIncome">Employment Income</option>
                    <option value="InheritanceOrTrust">Inheritance Or Trust</option>
                    <option value="InvestmentIncome">Investment Income</option>
                    <option value="RetirementIncome">Retirement Income</option>
                    <option value="Unemployment">Unemployment</option>
                    <option value="HouseholdIncome">Household Income</option>
                    <option value="SocialSecurity">Social Security</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" label="choose an employment status">
                <Col md="12">
                  <Form.Select area-label="choose an employment status" name="employmentStatus">
                    <option>- choose an Employment Status -</option>
                    <option value="Employed">Employed</option>
                    <option value="Retired">Retired</option>
                    <option value="SelfEmployed">Self Employed</option>
                    <option value="Student">Student</option>
                    <option value="Unemployed">Unemployed</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              {/* <Row>
          <Col md="8">{errorSignup !== null ? <Alert variant="danger">{errorSignup}</Alert> : null}</Col>
        </Row> */}
              <br />
              <hr />
              <h3>Account Details</h3>


              <Form.Group as={Row} className="mb-3">
                <Col md="12">
                  <Form.Control type="number" name="monthlyIncome" placeholder="Monthly Income *" required />
                </Col>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Check label="Regular" name="accountType" inline type={"radio"} value="Regular" defaultChecked={plan== "Regular"} disabled={plan && plan!== "Regular"} />
                <Form.Check label="Savings" name="accountType" inline type={"radio"} value="Savings" defaultChecked={plan== "Savings"} disabled={plan && plan!== "Savings"}/>
                <Form.Check label="Premium" name="accountType" inline type={"radio"} value="Premium" defaultChecked={plan== "Premium"} disabled={plan && plan!== "Premium"}/>
              </Form.Group>
</Col>
</Row>
              <Form.Group as={Row} className="my-4">
                <Col md="12">
                  <Button type="submit">Sign Up</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </center>
  )
}

export default SignUp
