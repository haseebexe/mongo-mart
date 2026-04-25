import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { server } from "@/main";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  async function fetchCart() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      setCart(data.cart);
     setSubTotal(data.subTotal);
setTotalItems(data.sumOfQuantities);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(product) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/cart/add`,
        { product },
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  async function updateCart(action, id) {

    setLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/cart/update?action=${action}`, { id }, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      toast.success(data.message);
      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error(error.response?.data?.message || "Failed to update cart");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCart(id) {
    try {
      const { data } = await axios.get(`${server}/api/cart/remove/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      toast.success(data.message);
      fetchCart();
    } catch (error) {
      console.error("Error deleting from cart:", error);
      toast.error(error.response?.data?.message || "Failed to delete from cart");
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subTotal,
        loading,
        addToCart,
        updateCart,
        setTotalItems,
        fetchCart,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
