import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage"
import SearchResultsPage from './routes/SearchResultsPage';
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  
  return (
    <div className="App">
      <Router>
        <Header />        
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/search" element={<SearchResultsPage/>} />          
        </Routes>
        <Footer />        
      </Router>      
    </div>
  );
}

export default App;
