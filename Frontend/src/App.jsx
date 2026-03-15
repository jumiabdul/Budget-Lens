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
import ProtectedRoutes from "./components/ProtectedRoutes"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { setTransactions } from './store/slices/transactionSlice'
import { setBudgets } from './store/slices/budgetSlice'
import { useEffect, useState } from "react";
import axiosInstance from './utils/axiosInstance'
import toast from "react-hot-toast"
import LoadingSpinner from './components/LoadingSpinner'
import NotFound from './pages/NotFound'
import PublicRoute from './components/PublicRoute'
import { setUser } from './store/slices/userSlice'

function GlobalComponent({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='grow'> {children}</main>
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute>
      <Login />
    </PublicRoute>
  },
  {
    path: "/signup",
    element: <PublicRoute>
      <Signup />
    </PublicRoute>
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
  },
  {
    path: "*",
    element: <NotFound />
  }

]);

// Load data from MongoDB on startup
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      // console.log("TOKEN:", token);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [txRes, budgetRes, userRes] = await Promise.all([
          axiosInstance.get("/transactions/get-all-transactions"),
          axiosInstance.get("/budgets/get-all-budgets"),
          axiosInstance.get("/users/get-user"),
        ]);

        dispatch(setTransactions(txRes.data.data));
        dispatch(setBudgets(budgetRes.data.data));
        dispatch(setUser(userRes.data.user)); 

      } catch (error) {
        toast.error("Failed to load user data, Please Refresh..!!");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />

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

