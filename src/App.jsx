import AddExpense from './pages/AddExpense'
import AddIncome from './pages/AddIncome'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login' 
import Signup from './pages/Signup'

function App() {

  return (
    <div>
      <Login/>
      <Signup/>
      <Dashboard/>
      <AddExpense/>
      <AddIncome/>
    </div>
  )
}

export default App
