import React, { createContext, useContext, useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// const port = process.env.REACT_APP_URL;

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

// Provider component
export const CartProvider = ({ children }) => {
    // Get course data
    // const [courseData, setCourseData] = useState();
    // const getCourseData = async () => {
    //     try {
    //         const res = await axiosInstance.get(`${port}/gettingCourseMasterData`);
    //         setCourseData(res.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getCourseData();
    // }, []);
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
