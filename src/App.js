import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import BankContext from "./utils/BankContext"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { toast, ToastContainer } from "react-toastify"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import EmailVerified from "./pages/EmailVerified"
import MyAccounts from "./pages/MyAccounts"
import faker from "faker"
import OneAccount from "./pages/OneAccount"
import Cards from "./pages/MyCards"
import OneCard from "./pages/OneCard"

function App() {
  const [profile, setProfile] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [operations, setOperations] = useState([])
  const [oneAccount, setOneAccount] = useState([])
  const [cards, setCards] = useState([])
  const [oneCard, setOneCard] = useState([])
  const navigate = useNavigate()

  const getProfile = async () => {
    const response = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })
    setProfile(response.data)
  }

  const getAccounts = async () => {
    const response = await axios.get("http://localhost:5000/api/my-accounts", {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })

    setAccounts(response.data)
  }

  const getCards = async () => {
    const response = await axios.get("http://localhost:5000/api/cards", {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })
    setCards(response.data)
  }

  const getOneCard = async cardId => {
    const response = await axios.get(`http://localhost:5000/api/cards/${cardId}`, {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })
    setOneCard(response.data)
  }
  const getOneAccount = async accId => {
    const response = await axios.get(`http://localhost:5000/api/accounts/${accId}`, {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })

    setOneAccount(response.data)
  }

  const getOperations = async () => {
    const response = await axios.get("http://localhost:5000/api/operations/my", {
      headers: {
        Authorization: localStorage.tokenBank,
      },
    })
    setOperations(response.data)
  }

  useEffect(() => {
    if (localStorage.tokenBank) getProfile()
  }, [])

  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        phoneNumber: form.elements.phoneNumber.value,
        monthlyIncome: form.elements.monthlyIncome.value,
        accountType: form.elements.accountType.value,
        address: form.elements.address.value,
        city: form.elements.city.value,
        employmentStatus: form.elements.employmentStatus.value,
        sourceOfIncome: form.elements.sourceOfIncome.value,
        zipCode: form.elements.zipCode.value,
      }
      await axios.post("http://localhost:5000/api/auth/signup", userBody)
      toast.success("signup success")
      navigate("/login")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }
  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }

      const response = await axios.post("http://localhost:5000/api/auth/login", userBody)

      const token = response.data
      localStorage.tokenBank = token

      getProfile()
      toast.success("login success")

      navigate("/profile")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const logout = () => {
    localStorage.removeItem("tokenBank")
    console.log("logout success")
  }

  const forgotPassword = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        email: form.elements.email.value,
      }
      await axios.post("http://localhost:5000/api/auth/forgot-password", userBody)
      toast.success("password reset link is sent, go check your email")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const resetPassword = async (e, token) => {
    e.preventDefault()
    try {
      const form = e.target
      const password = form.elements.password.value
      const passwordConfirmation = form.elements.passwordConfirmation.value
      if (password !== passwordConfirmation) return toast.error("password is not matching")

      const userBody = {
        password,
      }
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, userBody)
      toast.success("password reset")
      navigate("/login")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const addAccount = async (e) => {
    e.preventDefault()
    try {
      const form = e.target

      const accountsBody = {
        accountsNumber: faker.finance.accounts,
        accountType: form.elements.accountType.value,
      }
      await axios.post(`http://localhost:5000/api/accounts`, accountsBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()
      toast.success("Added Account Successfully")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const addCard = async (e, accId) => {
    e.preventDefault()
    try {
      const form = e.target

      let cardBody = {
        cardType: form.elements.cardType.value,
        pin: form.elements.pin.value,
      }
      await axios.post(`http://localhost:5000/api/cards/${accId}`, cardBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getCards()
      getProfile()
      toast.success("add card success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const depositOperation = async (e, accId) => {
    e.preventDefault()
    try {
      const form = e.target

      const depositBody = {
        amount: form.elements.amount.value,
      }
      await axios.post(`http://localhost:5000/api/operations/deposit/${accId}`, depositBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })

      getProfile()
      toast.success("added to balance successfully")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const withdrawOperation = async (e, accId) => {
    e.preventDefault()
    try {
      const form = e.target

      const withdrawBody = {
        amount: form.elements.amount.value,
      }
      await axios.post(`http://localhost:5000/api/operations/withdraw/${accId}`, withdrawBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()

      toast.success("withdraw success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const debitWithdraw = async (e, cardId) => {
    e.preventDefault()
    try {
      const form = e.target

      const withdrawBody = {
        amount: form.elements.amount.value,
      }
      await axios.post(`http://localhost:5000/api/operations/debit/withdraw/${cardId}`, withdrawBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()

      toast.success("withdraw success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const transferOperation = async (e, accId) => {
    e.preventDefault()
    try {
      const form = e.target

      const transferBody = {
        payeeName: form.elements.name.value,
        amount: form.elements.amount.value,
        destAccountNumber: form.elements.account.value,
      }
      await axios.post(`http://localhost:5000/api/operations/transfer/${accId}`, transferBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()

      toast.success("transfer success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const CardTransferOp = async (e, cardId) => {
    e.preventDefault()
    try {
      
      const form = e.target

      const transferBody = {
        payeeName: form.elements.name.value,
        amount: form.elements.amount.value,
        destAccountNumber: form.elements.account.value,
      }
      await axios.post(`http://localhost:5000/api/operations/card/transfer/${cardId}`, transferBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()
      toast.success("transfer success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const DebitDeposit = async (e, cardId) => {
    e.preventDefault()
    try {
      const form = e.target

      const depositBody = {
        amount: form.elements.amount.value,
      }
      await axios.post(`http://localhost:5000/api/operations/card/deposit/${cardId}`, depositBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })

      getProfile()
      toast.success("added balance to debit card successfully")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const CardWithdrawOp = async (e, cardId) => {
    e.preventDefault()
    try {
      console.log("hffhfhfh")
      const form = e.target

      const withdrawBody = {
        amount: form.elements.amount.value,
      }
      await axios.post(`http://localhost:5000/api/operations/card/withdraw/${cardId}`, withdrawBody, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      getProfile()

      toast.success("withdraw success")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deleteAccount = async accId => {
    try {
      await axios.delete(`http://localhost:5000/api/accounts/${accId}`, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      toast.success("account deleted")
      getProfile()
      navigate("profile")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const deleteCard = async cardId => {
    try {
      await axios.delete(`http://localhost:5000/api/cards/${cardId}`, {
        headers: {
          Authorization: localStorage.tokenBank,
        },
      })
      toast.success("card deleted")
      getAccounts()
      getProfile()
      navigate("cards")
    } catch (error) {
      if (error.response) toast.error(error.response.data)
      else console.log(error)
    }
  }

  const store = {
    addAccount,
    addCard,
    signup,
    login,
    logout,
    profile,
    accounts,
    oneAccount,
    operations,
    forgotPassword,
    resetPassword,
    getOneAccount,
    depositOperation,
    withdrawOperation,
    transferOperation,
    CardTransferOp,
    DebitDeposit,
    CardWithdrawOp,
    debitWithdraw,
    getOneCard,
    deleteAccount,
    deleteCard,
  }

  return (
    <BankContext.Provider value={store}>
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/email-verified/:token" element={<EmailVerified />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-accounts" element={<MyAccounts />} />
        <Route path="/accounts/one-account/:accId" element={<OneAccount />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/one-card/:accId/:cardId" element={<OneCard />} />
      </Routes>
    </BankContext.Provider>
  )
}
export default App
