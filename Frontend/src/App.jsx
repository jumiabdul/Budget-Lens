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
import Support from './pages/Support'
import ProtectedRoutes from './components/protectedRoutes'
import { Toaster } from "react-hot-toast"

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
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoutes>
        <GlobalComponent><Dashboard /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/add-budget",
      element: <ProtectedRoutes>
        <GlobalComponent><AddBudget /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/add-income",
      element: <ProtectedRoutes>
        <GlobalComponent><AddIncome /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/add-expense",
      element: <ProtectedRoutes>
        <GlobalComponent><AddExpense /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/transactions",
      element: <ProtectedRoutes>
        <GlobalComponent><Transactions /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/reports",
      element: <ProtectedRoutes>
        <GlobalComponent><Reports /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/budget-planner",
      element: <ProtectedRoutes>
        <GlobalComponent><BudgetPlanner /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/profile",
      element: <ProtectedRoutes>
        <GlobalComponent><Profile /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/settings",
      element: <ProtectedRoutes>
        <GlobalComponent><Settings /></GlobalComponent>
      </ProtectedRoutes>,
    },
    {
      path: "/support",
      element: <ProtectedRoutes>
        <GlobalComponent><Support /></GlobalComponent>
      </ProtectedRoutes>,
    }
  ]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1333',
            color: '#e2e8f0',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            fontSize: '13px',
          },
          success: {
            iconTheme: {
              primary: '#34d399',
              secondary: '#1a1333',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#1a1333',
            },
          },
        }}
      />

      <RouterProvider router={router} />
    </>
  )
}

export default App;

