import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navigation.module.css';

// Navbar component - main navigation
const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/workout-planner', label: 'Planner' },
    { path: '/history', label: 'History' },
    { path: '/progress', label: 'Progress' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={handleLinkClick}>
          💪 FitTracker
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        >
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${styles.navLink} ${
                  isActive(link.path) ? styles.active : ''
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
