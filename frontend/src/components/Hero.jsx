import React from "react";
import { Button } from "./ui/button";

const Hero = ({ navigate }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">

        {/* MAIN BANNER */}
        <div
          onClick={() => navigate("/products")}
          className="group relative col-span-2 h-[300px] cursor-pointer overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            alt="main banner"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6 text-white">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Latest Smartphones
            </h2>
            <p className="text-sm mt-2 text-gray-200">
              Explore new arrivals & best deals
            </p>
            <Button className="mt-4 w-fit">Shop Now</Button>
          </div>
        </div>

        {/* SIDE CARDS */}
        <div className="flex flex-row lg:flex-col gap-4">

          <div
            onClick={() => navigate("/products")}
            className="group relative h-[140px] cursor-pointer overflow-hidden rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
              Smart Watches
            </div>
          </div>

          <div
            onClick={() => navigate("/products")}
            className="group relative h-[140px] cursor-pointer overflow-hidden rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
              Laptops
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;