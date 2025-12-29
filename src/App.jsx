import AddBudget from './pages/AddBudget'
import AddExpense from './pages/AddExpense'
import AddIncome from './pages/AddIncome'
import BudgetPlanner from './pages/BudgetPlanner'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Transactions from './pages/Transactions'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function GlobalComponent({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='grow'> {children}</main>
      <Footer />
    </div>
  )
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GlobalComponent><Login /></GlobalComponent>,
    },
    {
      path: "/signup",
      element: <GlobalComponent><Signup /></GlobalComponent>,
    },
    {
      path: "/dashboard",
      element: <GlobalComponent><Dashboard /></GlobalComponent>,
    },
    {
      path: "/add-budget",
      element: <GlobalComponent><AddBudget /></GlobalComponent>,
    },
    {
      path: "/add-income",
      element: <GlobalComponent><AddIncome /></GlobalComponent>,
    },
    {
      path: "/add-expense",
      element: <GlobalComponent><AddExpense /></GlobalComponent>,
    },
    {
      path: "/transactions",
      element: <GlobalComponent><Transactions /></GlobalComponent>,
    },
    {
      path: "/reports",
      element: <GlobalComponent><Reports /></GlobalComponent>,
    },
    {
      path: "/budget-planner",
      element: <GlobalComponent><BudgetPlanner /></GlobalComponent>,
    },
    {
      path: "/profile",
      element: <GlobalComponent><Profile /></GlobalComponent>,
    },
    {
      path: "/settings",
      element: <GlobalComponent><Settings /></GlobalComponent>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

