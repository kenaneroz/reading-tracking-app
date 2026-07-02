import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './App.css'
import HomeScreen from './pages/HomeScreen'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
