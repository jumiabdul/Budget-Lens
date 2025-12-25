import AddExpense from './pages/AddExpense'
import AddIncome from './pages/AddIncome'
import BudgetPlanner from './pages/BudgetPlanner'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login' 
import Reports from './pages/Reports'
import Signup from './pages/Signup'
import Transactions from './pages/Transactions'

function App() {

  return (
    <div>
      <Login/>
      <Signup/>
      <Dashboard/>
      <AddExpense/>
      <AddIncome/>
      <Transactions/>
      <Reports/>
      <BudgetPlanner/>
    </div>
  )
}

export default App
