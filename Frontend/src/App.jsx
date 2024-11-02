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
import { Context } from "./context/ModelContext.jsx";
import Model from "./components/Model.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Bookmark from "./pages/BookmarkPage.jsx";
import Discover from "./pages/TemplatePage.jsx"

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
      <Context.Provider value={{ isOpen, setIsOpen }}>
        <NavBar />
        <Model open={isOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Layout />} />
          <Route path="/signup" element={<Layout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verification" element={<Layout />} />
          
          <Route path='/template/:id' element={<Discover />} />
          
          <Route
            path="/profile/:username"
            element={
              <Userprofile />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmark"
            element={
              <ProtectedRoute>
                <Bookmark />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
