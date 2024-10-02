import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { userRolesContext } from '../layout/RoleContext';
import Cookies from 'js-cookie';
import CookieConsent from './CookieConsent';  // Import CookieConsent
const port = process.env.REACT_APP_URL;

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [consentGiven, setConsentGiven] = useState(false); // Track if consent is given
    const { setUserRole, setUserId } = useContext(userRolesContext);
    const savedToken = Cookies.get('cookieConsent');
    const navigate = useNavigate();
    axiosInstance.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(consentGiven)
        if (!consentGiven) {
            alert("Please accept cookies to log in.");
            return;
        }
        axiosInstance.post(`${port}/login`, data)
            .then((res) => {
                if (res.status === 200) {
                    setUserRole(res.data.role);
                    setUserId(res.data.id);
                    Cookies.set('token', res.data.token, { expires: 1 });
                    navigate("/dashboard");
                } else {
                    alert("Invalid email or password");
                }
            })
            .catch((err) => {
                console.log(err + " error in login");
            });
    };

    useEffect(() => {
        if (savedToken) {  // Only call checkPermission if token is defined
            setConsentGiven(true);
        }
    }, [savedToken]);

    return (
        <>
            <CookieConsent onConsent={setConsentGiven} />
            <form className="login" onSubmit={handleSubmit}>
                <h2>Welcome, User!</h2>
                <p>Please log in</p>
                <input type="text" placeholder="Email" name='email' value={data.email} onChange={handleChange} />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} />
                <input type="submit" value="Log In" />
                <div className="links">
                    <a href="#">Forgot password</a>
                    <a href="#">Register</a>
                </div>
            </form>
        </>
    );
};

export default Login;
