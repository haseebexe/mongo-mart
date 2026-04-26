import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const OrderProcessing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const { fetchCart } = useCart();

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Session Id missing");
        return navigate("/cart");
      }

      if (paymentVerified) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await axios.post(
          `${server}/api/order/verify/payment`,
          { sessionId },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        if (data.success) {
          toast.success("Order Placed successfully");
          setPaymentVerified(true);
          fetchCart();
          setLoading(false);
          setTimeout(() => {
            navigate("/orders");
          }, 10000);
        }
      } catch (error) {
        toast.error("Payment verification failed.Please try again");
        navigate("/cart");
        console.log(error);
      }
    };

    if (sessionId && !paymentVerified) {
      verifyPayment();
    }
  }, [sessionId, paymentVerified, navigate]);

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
    <div className="w-full max-w-lg">

      {loading ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center space-y-6">

          {/* Animated Loader */}
          <div className="flex justify-center">
            <Loader className="w-12 h-12 animate-spin text-blue-600" />
          </div>

          <h1 className="text-2xl font-semibold">
            Processing your payment...
          </h1>

          <p className="text-gray-500 text-sm">
            Please wait while we confirm your order. Do not refresh or close this page.
          </p>

          {/* Fake progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse w-3/4"></div>
          </div>

        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center space-y-6">

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-green-600">
            Order Confirmed 🎉
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Your payment has been successfully processed.
          </p>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
            You will be redirected to your orders page shortly.
          </div>

          <Button
            className="w-full py-3 text-lg h-auto"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </Button>

        </div>
      )}

    </div>
  </div>
);
};

export default OrderProcessing;