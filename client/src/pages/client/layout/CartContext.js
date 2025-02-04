import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { userRolesContext } from "../../admin/layout/RoleContext";
import axiosInstance from "../utils/axiosInstance";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { stuUserId } = useContext(userRolesContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const savedToken = Cookies.get("student-token");

    const loadCart = async () => {
        setLoading(true);
        try {
            let updatedCart = [];

            if (savedToken && stuUserId) {
                const response = await axiosInstance.get(`/gettingStudentCart/${stuUserId}`, {
                    headers: { Authorization: `Bearer ${savedToken}` },
                });
                updatedCart = Array.isArray(response.data) ? response.data : [];
            } else {
                const storedCart = localStorage.getItem("cart");
                updatedCart = storedCart ? JSON.parse(storedCart) : [];
            }

            setCart(updatedCart); //  Update cart state
        } catch (error) {
            console.error("Error loading cart:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (stuUserId !== undefined) {
            loadCart();
        }
    }, [savedToken, stuUserId]);

    const saveCart = async (updatedCart) => {

        if (savedToken && stuUserId) {
            try {
                await axiosInstance.post(
                    "/addingStudentCart",
                    { cart: updatedCart },
                    { headers: { Authorization: `Bearer ${savedToken}` } }
                );
                const response = await axiosInstance.get(`/gettingStudentCart/${stuUserId}`, {
                    headers: { Authorization: `Bearer ${savedToken}` },
                });
                updatedCart = Array.isArray(response.data) ? response.data : [];
                setCart(updatedCart);
            } catch (error) {
                console.error("Error saving cart:", error);
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };

    const addToCart = async (course) => {
        if (!Array.isArray(cart)) {
            console.error("Cart is not an array, resetting to empty array.");
            setCart([]);
        }

        const uniqueCourse = { ...course, studentId: stuUserId || 0 };
        const updatedCart = [...cart, uniqueCourse];
        setCart(updatedCart);
        await saveCart(updatedCart);
    };

    const removeCart = async (course) => {
        let updatedCart = cart.filter((item) => savedToken ? item.id !== course.id : item.id !== course.id);
        setCart(updatedCart);

        if (savedToken && stuUserId) {
            try {
                await axiosInstance.delete("/removeStudentCart", {
                    params: { id: course.id, course_id: course.course_id, student_id: stuUserId },
                    headers: { Authorization: `Bearer ${savedToken}` },
                });
            } catch (error) {
                console.error("Error removing item from database:", error);
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };
    useEffect(() => {
        const moveCartToDatabase = async () => {
            if (savedToken && stuUserId) {
                const storedCart = localStorage.getItem("cart");
                if (storedCart) {
                    try {
                        const parsedCart = JSON.parse(storedCart);

                        // Fetch the latest cart from the database
                        const response = await axiosInstance.get(`/gettingStudentCart/${stuUserId}`, {
                            headers: { Authorization: `Bearer ${savedToken}` },
                        });

                        const dbCart = Array.isArray(response.data) ? response.data : [];

                        // Remove duplicate items (keeping only unique course_id)
                        const mergedCart = parsedCart.filter(
                            (localItem) => !dbCart.some((dbItem) => dbItem.course_id === localItem.id)
                        ).map((item) => ({ ...item, studentId: stuUserId }));
                        if (mergedCart.length > 0) {
                            await axiosInstance.post(
                                "/addingStudentCart",
                                { cart: mergedCart },
                                { headers: { Authorization: `Bearer ${savedToken}` } }
                            );
                        }

                        localStorage.removeItem("cart"); // Clear local storage after merging
                        setCart([...dbCart, ...mergedCart]); // Update cart state without duplicates
                    } catch (error) {
                        console.error("Error transferring cart to database:", error);
                    }
                }
            }
        };
        moveCartToDatabase();
    }, [savedToken, stuUserId]);


    return (
        <CartContext.Provider value={{ cart, addToCart, removeCart, loading, loadCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
