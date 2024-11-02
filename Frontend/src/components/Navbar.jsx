import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import logo from "/logo.png";
import Avatar from "@mui/joy/Avatar";
import gsap from "gsap";
import Search from "/icons/search.svg";
import axios from "axios";

import styles from "./css/navbar.module.css";

gsap.registerPlugin(useGSAP);

function NavBar() {
  return (
    <>
      <nav>
        <DesktopNav />
        <MobileNav />
      </nav>
    </>
  );
}

function DesktopNav() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [search, setSearch] = useState(false);
  const [panel, setPanel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    axios
      .post(
        `http://localhost:3000/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/signin");
        }
      });
  };

  const { pathname } = useLocation();
  useEffect(() => {
    setPanel(false);
  }, [pathname]);

  let menuRef = useRef();
  let searchButtonRef = useRef();
  let avatarButtonRef = useRef();
  let panelRef = useRef();

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  useGSAP(() => {
    gsap.from(".navbaranimatiom", {
      y: -30,
      duration: 0.5,
      stagger: 0.3,
      opacity: 0,
    });
  });

  const handleSearchToggle = () => {
    setSearch((prevSearch) => !prevSearch);
  };
  const handlepanelToggle = () => {
    setPanel((prevpanel) => !prevpanel);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(e.target)
      ) {
        setSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef, searchButtonRef]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  });

  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(e.target)
      ) {
        setPanel(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [panelRef, avatarButtonRef]);

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 40);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <ul
        className={`${styles.nav} flex justify-center items-center gap-20 list-none rounded-[12px] px-10 h-16 min-w-[450px] fixed text-white right-1/2 left-1/2 -translate-x-1/2 z-[9999] top-5`}
        style={
          scroll
            ? {
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              border: "1px solid #ffffff20",
            }
            : {}
        }
        onMouseEnter={(e) =>
          scroll
            ? (e.currentTarget.style.boxShadow = "")
            : (e.currentTarget.style.boxShadow = "none")
        }
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        {["Home", "Search", isLoggedIn ? "Upload" : "Sign In"].map(
          (item, index) => (
            <li
              key={index}
              className={`cursor-pointer navbaranimatiom ${hoveredIndex === index ? styles.hovered : ""
                } ${hoveredIndex !== null && hoveredIndex !== index
                  ? styles["other-hovered"]
                  : ""
                }`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              {item === "Home" || item === "Sign In" || item === "Upload" ? (
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : item === "Sign In"
                        ? "/signin"
                        : "/upload"
                  }
                >
                  {item}
                </Link>
              ) : (
                <span ref={searchButtonRef} onClick={handleSearchToggle}>
                  {item}
                </span>
              )}
            </li>
          )
        )}
      </ul>

      {panel ? (
        <>
          <div
            className={`absolute  border-2 text-white right-[5.5vw] top-[6vw] ${styles.dropdownbox} z-[60] rounded-3xl p-3  w-[10vw]`}
            ref={panelRef}
          >
            <ul className="flex flex-col font-['Exo'] gap-1">
              <Link to="/profile">
                <li className="p-1 pl-3 duration-300 border-2 border-transparent cursor-pointer hover:border-b-gray-700">
                  Profile
                </li>
              </Link>
              <Link to="/bookmark">
                <li className="p-1 pl-3 duration-300 border-2 border-transparent cursor-pointer hover:border-b-gray-700">
                  Bookmark
                </li>
              </Link>
              <li className="p-1 pl-3 duration-300 border-2 border-transparent cursor-pointer hover:border-b-gray-700 ">
                FeedBack
              </li>
              <li
                onClick={logout}
                className="p-1 pl-3 text-red-500 duration-300 border-2 border-transparent cursor-pointer hover:border-b-gray-700"
              >
                Logout
              </li>
            </ul>
          </div>
        </>
      ) : null}

      {search && pathname == "/" ? (
        <div className="fixed z-40 flex items-center justify-center w-full h-screen overflow-hidden duration-500 backdrop-blur-lg">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <img className="w-5" src={Search} alt="Search Icon" />
            </div>
            <input
              type="search"
              id="search"
              className="block w-[600px] p-4 ps-10 text-sm text-gray-400 rounded-lg bg-gray-700 outline-none"
              placeholder="Search"
              ref={menuRef}
            />
          </div>
        </div>
      ) : null}

      <div
        className={`flex justify-between items-center text-white font-['Exo'] px-20 h-16 text-xl ${styles.background} absolute w-[97%] mt-5 mx-5 overflow-hidden z-[50] duration-500 border-[#ffffff20]`}
      >
        <Link to="/">
          <div className="flex items-center justify-center">
            <img className="h-[60px]" src={logo} alt="logo" />
          </div>
        </Link>
        <div>
          <Avatar onClick={handlepanelToggle} ref={avatarButtonRef} />
        </div>
      </div>
    </>
  );
}

function MobileNav() {
  return <></>;
}

export default NavBar;