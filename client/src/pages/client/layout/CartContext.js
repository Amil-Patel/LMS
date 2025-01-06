import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { userRolesContext } from '../../admin/layout/RoleContext';
import axiosInstance from '../utils/axiosInstance';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { stuUserId } = useContext(userRolesContext);
    const [cart, setCart] = useState([]);
    const savedToken = Cookies.get('student-token');
    const loadCart = async () => {
        if (savedToken && stuUserId) {
            try {
                const response = await axiosInstance.get(`/gettingStudentCart/${stuUserId}`, {
                    headers: { Authorization: `Bearer ${savedToken}` },
                });

                // Assuming response.data is an array
                setCart(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error loading cart from database:', error);
            }
        } else {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                try {
                    const parsedCart = JSON.parse(storedCart);
                    setCart(Array.isArray(parsedCart) ? parsedCart : []);
                } catch {
                    console.error('Error parsing cart from localStorage');
                }
            }
        }
    };
    useEffect(() => {
        loadCart();
    }, [savedToken, stuUserId]);


    // Save cart to the database or localStorage
    const saveCart = async (updatedCart) => {
        if (savedToken && stuUserId) {
            try {
                await axiosInstance.post(
                    '/addingStudentCart',
                    { cart: updatedCart },
                    { headers: { Authorization: `Bearer ${savedToken}` } }
                );
                loadCart();
            } catch (error) {
                console.error('Error saving cart to database:', error);
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(updatedCart));

        }
    };

    // Add to cart
    const addToCart = async (course) => {
        if (!Array.isArray(cart)) {
            console.error("Cart is not an array, resetting to empty array.");
            setCart([]); // Reset cart to an empty array
        }
        const uniqueCourse = {
            ...course,
            studentId: stuUserId ? stuUserId : 0
        };
        console.log(uniqueCourse)
        const updatedCart = [...cart, uniqueCourse];
        setCart(updatedCart);
        if (savedToken && stuUserId) {
            saveCart(uniqueCourse);
        } else {
            saveCart(updatedCart);
        }
    };

    // Remove from cart
    const removeCart = async (course) => {
        if (savedToken && stuUserId) {
            const data = { id: course.id, course_id: course.course_id, student_id: stuUserId }
            try {
                const res = await axiosInstance.delete(`/removeStudentCart`, {
                    params: data,
                    headers: { Authorization: `Bearer ${savedToken}` },
                });
                const updatedCart = cart.filter((item) => item.course_id !== course.course_id);
                setCart(updatedCart);
            } catch (error) {
                console.error('Error removing item from database:', error);
            }
        } else {
            const updatedCart = cart.filter((item) => item.id !== course.id);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    useEffect(() => {
        const moveCartToDatabase = async () => {
            if (savedToken && stuUserId) {
                const storedCart = localStorage.getItem('cart');
                const parsedCart = JSON.parse(storedCart);
                const mergedCart = parsedCart?.map((item) => ({
                    ...item,
                    studentId: stuUserId,
                }));
                console.log(savedToken, stuUserId, mergedCart);
                if (mergedCart.length > 0) {
                    try {
                        await axiosInstance.post('/addingStudentCart', { cart: mergedCart }, { headers: { Authorization: `Bearer ${savedToken}` } }
                        );
                        localStorage.removeItem('cart');
                        setCart(storedCart);
                    } catch (error) {
                        console.error('Error transferring cart to database:', error);
                    }
                }
            }
        };
        moveCartToDatabase();
    }, [savedToken, stuUserId]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
