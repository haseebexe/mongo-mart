import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAddress } from "@/context/AddressContext";
import { useCart } from "@/context/CartContext";
import { server } from "@/main";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const { id } = useParams();
  const { cart, subTotal, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("");
  const { selectedAddress, fetchSingleAddress } = useAddress();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleAddress(id);
  }, [id]);

  console.log(selectedAddress);

  const paymentHandler = async () => {
    setLoading(true);
    if (!method) return toast.error("Please select a payment method");

    if (method === "cod") {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${server}/api/order/new/cod`,
          {
            method,
            phone: selectedAddress.phone,
            address: selectedAddress.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          },
        );

        toast.success(data.message);
        fetchCart();
        navigate("/orders");
      } catch (error) {
        toast.error(error.response?.data?.message || "Payment failed");
      } finally {
        setLoading(false);
      }
    }

    if (method === "online") {
      const stripePromise = loadStripe(
        "pk_test_51TQO4D1K3cTiRGJLxe0HfTvDNTBbPWtRTMlUGbmMPsRxeRCXcQ5UEm8vdpvlU5icd3DDPAuPvBmWbY0U7ScAdV6800eTb88FnU",
      );

      try {
        setLoading(true);
        const stripe = await stripePromise;
        const { data } = await axios.post(
          `${server}/api/order/new/online`,
          {
            method,
            phone: selectedAddress.phone,
            address: selectedAddress.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          },
        );

        if (data.url) {
            window.location.href = data.url;
            setLoading(false);
        } else {
            toast.error("Failed to initiate payment");
            setLoading(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Payment failed");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
  
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">

    {/* LEFT SIDE - PRODUCTS */}
    <div className="md:col-span-2 space-y-6">

      <h2 className="text-2xl font-semibold">Checkout</h2>

      {/* PRODUCTS */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 space-y-4">
        <h3 className="font-semibold text-lg">Your Items</h3>

        {cart?.map((e, i) => (
          <div key={i} className="flex gap-4 border-b pb-4 last:border-none">
            <img
              src={e.product.images[0].url}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h4 className="font-medium">{e.product.title}</h4>
              <p className="text-sm text-gray-500">
                Rs {e.product.price} × {e.quantity}
              </p>
            </div>

            <div className="font-semibold">
              Rs {(e.product.price * e.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS */}
      {selectedAddress && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
          <h3 className="font-semibold text-lg mb-3">Delivery Address</h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedAddress.address}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedAddress.phone}
          </p>
        </div>
      )}

      {/* PAYMENT METHOD */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 space-y-4">
        <h3 className="font-semibold text-lg">Payment Method</h3>

        <div className="space-y-3">

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black">
            <input
              type="radio"
              value="cod"
              checked={method === "cod"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black">
            <input
              type="radio"
              value="online"
              checked={method === "online"}
              onChange={(e) => setMethod(e.target.value)}
            />
            <span>Credit / Debit Card</span>
          </label>

        </div>
      </div>

    </div>

    {/* RIGHT SIDE - SUMMARY */}
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 h-fit sticky top-20">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs {subTotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>Rs {subTotal.toLocaleString()}</span>
        </div>
      </div>

      <Button
        className="w-full mt-6 py-2 h-auto text-[14px]"
        onClick={paymentHandler}
        disabled={!method || !selectedAddress}
      >
        {loading ? "Processing..." : "Place Order"}
      </Button>
    </div>

  </div>
</div>
  );
};

export default Payment;
