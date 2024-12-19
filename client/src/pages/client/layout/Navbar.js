import React, { useState, useRef } from 'react';
import '../../../assets/css/client/navbar.css';
import { NavLink } from 'react-router-dom';
import '../../../assets/css/client/common.css';
import LoginForm from './LoginForm';
import { RoleContext } from '../../admin/layout/RoleContext';
import SignupForm from './SignupForm';
import Cookies from 'js-cookie';
import { useCart } from './CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const savedToken = Cookies.get('student-token');
  const profileRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleModal = () => {
    if (!isModalOpen) {
      // Get position of profile image and set modal position
      const rect = profileRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY, // position below the image
        left: rect.left + window.scrollX, // align with the image
      });
    }
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  // Function to toggle the modal visibility
  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
    setIsMenuOpen(false);
    setIsSignupFormOpen(false); // Close signup form when opening login form
  };

  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  // Function to toggle the modal visibility
  const toggleSignupForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
    setIsMenuOpen(false);
    setIsLoginFormOpen(false); // Close login form when opening signup form
  };

  //log out
  const handleLogoutClick = () => {
    Cookies.remove('student-token');
  };
  return (
    <>
      <nav className='navbar-section'>
        <div className={`navbar-logo-section ${isMenuOpen ? 'notdisplay' : ''}`}>
          <div className='navbar-logo'>
            <NavLink to="/">
              <img src={require("../../../assets/image/Logo.png")} alt="logo" />
            </NavLink>
          </div>
        </div>
        <div className={`navbar-pages ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-course" onClick={() => setIsMenuOpen(false)}>Courses</NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
            </li>
          </ul>
        </div>

        <div className={`navbar-login-section ${isMenuOpen ? '' : 'notdisplay'}`}>
          {/*cart section  */}
          <NavLink to="/shopping-cart" className="cart_section">
            <i className="fa-solid fa-cart-arrow-down"></i>
            <p className="p-0">{cart.length}</p>
          </NavLink>
          {/*cart section  */}
          {!savedToken && (
            <>
              <button className="login_btn" onClick={toggleLoginForm}>Login</button>
              <button className="signup_btn" onClick={toggleSignupForm}>Register</button>
            </>
          )}
          {savedToken && (
            <div className="profile-section" ref={profileRef} onClick={toggleModal}>
              <img src={require("../../../assets/image/user_img.jpeg")} alt="Profile" />
            </div>
          )}
        </div>
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </div>
      </nav>
      {isModalOpen && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div className="modal" style={{ top: modalPosition.top + 6, left: modalPosition.left - 78 }}>
            <ul>
              <li>
                <NavLink to="/student/stu-profile">
                  <i className="fa-regular fa-user"></i>My Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogoutClick}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      {isLoginFormOpen && (
        <div className="client_section">
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl relative w-11/12 sm:w-96 max-w-md lg:h-max md:h-4/5 sm:h-4/5">
              {/* Close Button */}
              <button
                onClick={() => setIsLoginFormOpen(false)}
                className="absolute top-2 right-5 text-gray-600 hover:text-black text-2xl"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {/* Login Form */}
              <RoleContext>
                <LoginForm toggleSignupForm={toggleSignupForm} toggleLoginForm={toggleLoginForm} />
              </RoleContext>
            </div>
          </div>
        </div>

      )}

      {isSignupFormOpen && (
        <div className="client_section">
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl relative w-11/12 sm:w-96 max-w-md lg:h-max md:h-4/5 sm:h-4/5">
              {/* Close Button */}
              <button
                onClick={() => setIsSignupFormOpen(false)}
                className="absolute top-2 right-5 text-gray-600 hover:text-black text-2xl"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {/* Signup Form */}
              <SignupForm toggleLoginForm={toggleLoginForm} toggleSignupForm={toggleSignupForm} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
