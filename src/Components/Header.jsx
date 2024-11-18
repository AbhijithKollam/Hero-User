import React, { useState, useEffect } from 'react';
import './style.css'; // Import the CSS file
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);  // State to track header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const navigate = useNavigate()

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY); // Update the last scroll position
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => window.removeEventListener('scroll', handleScroll); // Clean up on component unmount
  }, [lastScrollY]); // Dependency array ensures effect runs only when lastScrollY changes

  const location = useLocation();  // Get the current location
  const currentPage = location.pathname; // Extract the pathname


  const getLinkClass = (path) => {
    return currentPage === path ? 'active' : '';
  };
  const handleLogout = () => {
    localStorage.setItem("existingUser",null);
    navigate("/")
  }
  return (
    <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="header-container">
        <div className="header-title">
          <h1>Mr X : Your Guardian</h1>
        </div>
        <div className="header-links">
          <Link to='/home'><h4 className={getLinkClass('/home')}>Home</h4></Link>
          <Link to='/about'><h4 className={getLinkClass('/about')}>About</h4></Link>
          <Link to='/complaints'><h4 className={getLinkClass('/complaints')}>Complaints</h4></Link>
          <button className='btn d-flex bg-success' onClick={handleLogout}> <h4>Logout</h4><i class="fa-solid fa-right-from-bracket text-white ms-2"></i></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
