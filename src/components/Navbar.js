import { useContext } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import BankContext from "../utils/BankContext"
import { ImProfile } from "react-icons/im"
import { AiFillHome } from "react-icons/ai"
import { IoCardSharp } from "react-icons/io5"
import { Divider} from 'semantic-ui-react'
import { MdOutlineLogin, MdOutlineAccountBalanceWallet, MdAccountBalance, MdOutlineLogout } from "react-icons/md"
function NavbarItem() {
  const { logout } = useContext(BankContext)
  const accIcon = <MdAccountBalance />
  return (
    <Navbar style={{ backgroundColor: "#1c2541" }} variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://directory-cdn.anymailfinder.com/01db1769-4820-4024-9334-3456823c0d74"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <strong> Bank</strong>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className="nav-link"
              to="/"
              title="Home"
              style={{ color: "white" }}
            >
              <AiFillHome size={"1.1em"} /> Home{" "}
            </Link>
            
            <Link className="nav-link" to="/profile" title="Profile" style={{ color: "white" }}>
              <ImProfile size={"1.1em"} /> Profile{" "}
            </Link>
            
          </Nav>
          {localStorage.tokenBank ? (
            <Nav className="ms-auto">
              <NavDropdown title="Accounts" style={{ color: "white" }}>
                <Link className="dropdown-item" to="/cards" style={{ color: "#1c2541" }}>
                  <IoCardSharp size={"1.1em"} /> -My Cards{" "}
                </Link>

                <NavDropdown.Divider />
                <Link className="dropdown-item" to="/my-accounts" style={{ color: "#1c2541" }}>
                  <MdOutlineAccountBalanceWallet size={"1.2em"} /> -All Accounts
                </Link>
              </NavDropdown>
              <Link className="nav-link" to="/" title="LogOut" onClick={logout} style={{ color: "white" }}>
                <MdOutlineLogout size={"1.3em"} /> Logout{" "}
              </Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Link className="nav-link" to="/login" title="Login" style={{ color: "white" }}>
                <MdOutlineLogin size={"1.5em"} /> Login{" "}
              </Link>
              {/*   <Link className="nav-link" to="/signup" title="Register">
                Register{" "}
              </Link> */}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarItem
