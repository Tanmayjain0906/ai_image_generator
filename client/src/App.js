import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ResultPage from './pages/ResultPage';
import PricingPage from './pages/Pricing Page';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import AuthModal from './components/AuthModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const { isModalShow, setIsModalShow } = useContext(AppContext);

  return (
    <div>
      <ToastContainer position="top-right" />

      <Navbar />
      {
        isModalShow && <AuthModal onClose={() => setIsModalShow(false)} />
      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='/pricing' element={<PricingPage />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
