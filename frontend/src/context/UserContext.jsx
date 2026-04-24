import { server } from "@/main";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  async function loginUser(email, navigate) {
    if (!email?.trim()) {
      toast.error("Email is required");
      return;
    }

    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email: email.trim(),
      });

      toast.success(data.message);
      localStorage.setItem("email", email.trim());
      navigate("/verify");
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setBtnLoading(false);
    }
  }

  async function verifyUser(otp, navigate) {
    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    setBtnLoading(true);
    const email = localStorage.getItem("email");

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        email: email.trim(),
        otp,
      });

      toast.success(data.message);
      localStorage.clear();
      setIsAuth(true);
      setUser(data.user);
      navigate("/");
      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        sameSite: "strict",
      });
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: Cookies.get("token"),
        }
      });
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
        setLoading(false);
        setIsAuth(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        loginUser,
        verifyUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
