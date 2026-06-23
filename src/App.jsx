import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import ClassesPage from './pages/ClassesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Auth pages without navbar/footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Main pages with navbar/footer */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/classes" element={<ClassesPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
