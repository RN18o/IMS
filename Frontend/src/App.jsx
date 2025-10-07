import './App.css'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
