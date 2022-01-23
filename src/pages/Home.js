import { Container, Row, Col, Card, Table } from "react-bootstrap"
import { useContext } from "react"
import BankContext from "../utils/BankContext"
import "./Home.scss"
import { Link } from "react-router-dom"
function Home() {
  return (
    <>
      <div class="price-table-wrapper">
 
        <div class="pricing-table featured-table">
          <h2 class="pricing-table__header">- SAVINGS -</h2>
          <h3 class="pricing-table__price">Open for Minimum Deposit of 1,000 SAR</h3>
          <Link class="pricing-table__button" to="/signup?plan=Savings">
           Open Your Account!
          </Link>
          <ul class="pricing-table__list">
          <li>No Debit/Credit Card included</li>
            <li>Transfer Amount is Capped to 20,000 SAR for Account, and 5,000 SAR for card</li>
            <li>Withdraw Amount is Capped to 5,000 SAR for Account and 2,000 SAR for debit Cards</li>
            <li>Deposit Amount is Capped to 10,000 SAR for Account and Cards</li>
          </ul>
        </div>
        <div class="pricing-table">
          <h2 class="pricing-table__header">- REGULAR -</h2>
          <h3 class="pricing-table__price">Open for Minimum Deposit of 5,000 SAR</h3>
          <Link class="pricing-table__button" to="/signup?plan=Regular">
            Open Your Account!
          </Link>
          <ul class="pricing-table__list">
            <li>No Debit Card included</li>
            <li>transfer Amount is Capped to 100,000 SAR for Account, and 5,000 SAR for Card</li>
            <li>withdraw Amount is Capped to 10,000 SAR for Account and Cards</li>
            <li>deposit Amount is Capped to 100,000 SAR for Account and Cards</li>
          </ul>
        </div>
        <div class="pricing-table">
          <h2 class="pricing-table__header">- PREMIUM -</h2>
          <h3 class="pricing-table__price">Open for Minimum Deposit of 50,000 SAR</h3>
          <Link class="pricing-table__button" to="/signup?plan=Premium">
           Open Your Account!
          </Link>
          <ul class="pricing-table__list">
          <li>Debit Card is included with initial balance of 10,000 SAR</li>
          <li>Transfer Amount is Open for Account, and Cards</li>
            <li>Withdraw Amount is Open for Account, and Cards</li>
            <li>Deposit Amount is Open for Account, and Cards</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home
