import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import NavBar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import Contact from "./pages/ContactPage.jsx";
import Footer from "./components/Footer.jsx";
import Profile from "./pages/ProfilePage.jsx";
import Userprofile from "./pages/UserProfilePage.jsx";
import Layout from "./pages/Layout.jsx";
import Upload from "./pages/UploadPage.jsx";
import { modalContext } from "./context/ModelContext.jsx";
import Model from "./components/Model.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Discover from "./pages/TemplatePage.jsx"
import Edit from "./pages/TemplateEditPage.jsx"

function App() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        lerp: 0.1,
        smooth: true,
        duration: 1.5,
      });

      const onAnimationFrame = (time) => {
        lenisRef.current.raf(time);
        requestAnimationFrame(onAnimationFrame);
      };

      requestAnimationFrame(onAnimationFrame);
    }
  }, []);

  useEffect(() => {
    lenisRef.current.scrollTo(0, 0);
  }, [location.pathname]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <modalContext.Provider value={{ isOpen, setIsOpen }}>
        <NavBar />
        <Model open={isOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Layout />} />
          <Route path="/signup" element={<Layout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verification" element={<Layout />} />
          <Route path='/template/:id' element={<Discover />} />
          <Route path='/template/edit/:id' element={<Edit />} />
          <Route path="/profile/:username" element={<Userprofile />} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/bookmark" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </modalContext.Provider>
    </>
  );
}

export default App;
