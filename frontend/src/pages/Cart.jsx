import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { ArrowRight, ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, subTotal, updateCart, deleteCart, totalItems } = useCart();
  const navigate = useNavigate();

  const updateCartHandler = async (action, id) => {
    await updateCart(action, id);
  };

  const handleDeleteCart = async (id) => {
    if (confirm("Remove this item from cart?")) {
      await deleteCart(id);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
  //       <div className="mx-auto max-w-6xl">
  //         <div className="h-8 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
  //         <div className="mt-6 grid gap-6 lg:grid-cols-3">
  //           <div className="space-y-4 lg:col-span-2">
  //             {[1, 2, 3].map((i) => (
  //               <div
  //                 key={i}
  //                 className="h-32 animate-pulse rounded-2xl bg-white shadow-sm dark:bg-slate-900"
  //               />
  //             ))}
  //           </div>
  //           <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm dark:bg-slate-900" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            Review your items before checkout
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex min-h-[55vh] items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-dashed bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <ShoppingCart className="h-8 w-8 text-slate-500" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                Your cart is empty
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Add some products to continue shopping.
              </p>
              <Button
                className="mt-6 w-full rounded-xl py-5 text-base sm:w-auto"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => {
                const lineTotal = item.product.price * item.quantity;

                return (
                  <div
                    key={item._id}
                    className="relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5"
                  >
                    <button
                      onClick={() => handleDeleteCart(item._id)}
                      className="absolute right-3 top-3 rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                    </button>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Link
                        to={`/product/${item.product._id}`}
                        className="shrink-0"
                      >
                        <div className="h-24 w-24 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-28 sm:w-28">
                          <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${item.product._id}`}>
                          <h3 className="line-clamp-2 text-base font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 sm:text-lg">
                            {item.product.title}
                          </h3>
                        </Link>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Unit price: Rs{" "}
                          {item.product.price.toLocaleString("en-PK")}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
                          <div className="flex items-center rounded-xl border bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-none rounded-l-xl cursor-pointer"
                              onClick={() => updateCartHandler("dec", item._id)}
                            >
                              <Minus className="h-4 w-4 cursor-pointer" />
                            </Button>

                            <span className="min-w-12 px-3 text-center text-sm font-semibold text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-none rounded-r-xl cursor-pointer"
                              onClick={() => updateCartHandler("inc", item._id)}
                            >
                              <Plus className="h-4 w-4 " />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          Total
                        </span>
                        <p className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                          Rs {lineTotal.toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:sticky lg:top-17">
              <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Order Summary
                </h2>

                <Separator className="my-4 bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Items
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      Rs {subTotal.toLocaleString("en-PK")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Shipping
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <Separator className="my-4 bg-slate-200 dark:bg-slate-800" />

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Rs {subTotal.toLocaleString("en-PK")}
                  </span>
                </div>

                <Button
                  className="mt-5 w-full rounded-xl py-6 text-base font-semibold"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="mt-3 w-full rounded-xl py-6 text-base"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
