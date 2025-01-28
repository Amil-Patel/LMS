import React, { useState, useRef, useEffect, useContext } from 'react';
import '../../../assets/css/client/navbar.css';
import { NavLink } from 'react-router-dom';
import '../../../assets/css/client/common.css';
import LoginForm from './LoginForm';
import { RoleContext, userRolesContext } from '../../admin/layout/RoleContext';
import SignupForm from './SignupForm';
import Cookies from 'js-cookie';
import { useCart } from './CartContext';
import axiosInstance from '../utils/axiosInstance';
const port = process.env.REACT_APP_URL;

const Navbar = () => {
  const { cart } = useCart();
  const { stuUserId } = useContext(userRolesContext);
  const [animateCart, setAnimateCart] = useState(false);
  const previousCartLength = useRef(cart.length);
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


  useEffect(() => {
    if (cart.length > previousCartLength.current) {
      // Course added
      setAnimateCart(true);
    } else if (cart.length < previousCartLength.current) {
      // Course removed
      setAnimateCart(true);
    }
    const timeout = setTimeout(() => setAnimateCart(false), 500); // Reset animation after 500ms
    previousCartLength.current = cart.length; // Update previous cart length
    return () => clearTimeout(timeout);
  }, [cart]);


  //get user data
  const [userData, setUserData] = useState([]);
  const getUserData = async () => {
    if (!stuUserId) return
    try {
      const response = await axiosInstance.get(`${port}/gettingUserMasterDataWithId/${stuUserId}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, [stuUserId]);
  return (
    <>
      <div className='client_section'>
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
            <NavLink to="/shopping-cart" className={`cart_section ${animateCart ? 'animate-cart' : ''}`}>
              <i className="fa-solid fa-cart-arrow-down"></i>
              <p className="course-added-quantity">{cart.length}</p>
            </NavLink>

            {/*cart section  */}
            {!savedToken && (
              <>
                <button className="login_btn" onClick={toggleLoginForm}>Login</button>
                <button className="signup_btn" onClick={toggleSignupForm}>Register</button>
              </>
            )}
            {savedToken && (
              <div className="profile-section relative" ref={profileRef} onClick={toggleModal}>
                {userData?.profile ? (
                  <img src={`../upload/${userData?.profile}`} alt="Profile" />
                ) : (
                  <img src={require("../../../assets/image/default-profile.png")} alt="Profile" />
                )}
              </div>
            )}
          </div>
          {/* Hamburger Icon */}
          <div className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
          </div>
        </nav>
      </div>
      {isModalOpen && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div
            className="modal absolute bg-white rounded-lg shadow-lg p-4"
            style={{ top: modalPosition.top + 6, left: modalPosition.left - 223 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-5">
              {userData?.profile ? (
                <img src={`../upload/${userData?.profile}`} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              ) : (
                <img src={require("../../../assets/image/default-profile.png")} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
              )}
              <div>
                <p className="font-semibold text-[15px] text-[#4880FF]">{userData?.first_name + " " + userData?.last_name}</p>
                <p className="text-sm text-gray-500 lowercase">{userData?.email}</p>
              </div>
            </div>
            <ul className="space-y-3">
              <li>
                <NavLink to="/student/stu-profile" className="flex items-center text-gray-700 hover:text-primary">
                  <i className="fa-solid fa-user-gear mr-2"></i>My Profile
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogoutClick} className="flex items-center text-gray-700 hover:text-primary">
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>Sign Out
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
