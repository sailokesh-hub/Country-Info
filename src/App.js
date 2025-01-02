import { useState } from "react";
import "./App.css";
import CountryDetails from "./components/CountryDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Router>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
