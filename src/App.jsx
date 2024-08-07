// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Protection from './components/Protection'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/dashboard' element={
            <Protection>
              <Dashboard />
            </Protection>
          } />
        </Routes>
      </Router>

    </div>
  )
}

export default App
