
import './App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="questionnaire" element={<QuestionnairePage />} />
            <Route path="booking" element={<BookingPage />} />
            {/* <Route path="log-in" element={<LogInPage />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
