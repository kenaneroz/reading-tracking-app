import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import { useState } from "react";
import { books as initialBooks } from "./data/books";

function App() {
  const [books, setBooks] = useState(initialBooks)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen books={books} setBooks={setBooks} />} />
        <Route path="/book/:id" element={<DetailsScreen books={books} setBooks={setBooks} />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
