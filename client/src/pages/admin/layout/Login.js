import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { userRolesContext } from '../layout/RoleContext';
import { notifyInfo, notifyWarning } from "../layout/ToastMessage";
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
        if (!consentGiven) {
            notifyWarning("Please accept cookies to log in.");
            return;
        }
        if (!data.email) {
            notifyInfo("Please enter email");
            return;
        }
        if (!data.password) {
            notifyInfo("Please enter password");
            return;
        }
        axiosInstance.post(`${port}/login`, data)
            .then((res) => {
                if (res.status === 200) {
                    setUserRole(res.data.role);
                    setUserId(res.data.id);
                    Cookies.set('token', res.data.token, { expires: 7 });
                    navigate("/admin/dashboard");
                } else {
                    notifyInfo(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
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
                <input type="text" placeholder="Email" name='email' value={data.email} autoComplete='off' onChange={handleChange} />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} />
                <input type="submit" className='cursor-pointer' value="Log In" />
            </form>
        </>
    );
};

export default Login;
