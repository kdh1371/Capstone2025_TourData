import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage"
import SearchResultsPage from './routes/SearchResultsPage';
import DetailPage from './routes/DetailPage';
import ErrorPage from './routes/ErrorPage';
import NotFound from './routes/NotFound';
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
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFound />} />          
        </Routes>
        <Footer />        
      </Router>      
    </div>
  );
}

export default App;
