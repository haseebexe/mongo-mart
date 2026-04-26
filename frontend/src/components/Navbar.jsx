import {
  LogIn,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useUserData } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logoutUser, isAuth } = useUserData();
  const { totalItems, setTotalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    logoutUser(navigate, setTotalItems);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://dummyimage.com/40x40/000/fff&text=E"
            alt="logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            E-Store
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden items-center gap-6 md:flex">
          <li
            className="cursor-pointer text-sm font-medium text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white"
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className="cursor-pointer text-sm font-medium text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white"
            onClick={() => navigate("/products")}
          >
            Products
          </li>

          <li
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </li>

          {/* USER DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              {isAuth ? (
                <User className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <LogIn className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {!isAuth ? (
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Your Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </ul>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-3 md:hidden">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-4">
            <span
              className="cursor-pointer text-sm font-medium"
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
            >
              Home
            </span>

            <span
              className="cursor-pointer text-sm font-medium"
              onClick={() => {
                navigate("/products");
                setMenuOpen(false);
              }}
            >
              Products
            </span>

            {!isAuth ? (
              <span
                className="cursor-pointer text-sm font-medium"
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </span>
            ) : (
              <>
                <span
                  className="cursor-pointer text-sm font-medium"
                  onClick={() => {
                    navigate("/orders");
                    setMenuOpen(false);
                  }}
                >
                  Your Orders
                </span>

                <span
                  className="cursor-pointer text-sm font-medium text-red-500"
                  onClick={() => {
                    logoutHandler();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </span>
              </>
            )}

            <div className="pt-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;