import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useProductData } from "@/context/ProductContext";
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const { newProd } = useProductData();

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <Hero navigate={navigate} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
     
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Latest Products
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Discover our newest arrivals
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate("/products")}>
            View All
          </Button>
        </div>

     
        {newProd?.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {newProd.filter((item) => item.stock > 0).map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="h-full transition duration-300 hover:-translate-y-1">
                    <ProductCard product={item} latest="yes" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 hidden sm:flex bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700" />
            <CarouselNext className="right-2 hidden sm:flex bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700" />
          </Carousel>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-slate-500">No products yet</p>
          </div>
        )}
      </section>

      <section className="bg-white py-10 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-xl border p-6 text-center dark:border-slate-800">
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm text-muted-foreground mt-2">
              On orders over Rs 5000
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center dark:border-slate-800">
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm text-muted-foreground mt-2">
              100% secure transactions
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center dark:border-slate-800">
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="text-sm text-muted-foreground mt-2">
              7 days return policy
            </p>
          </div>

          <div className="rounded-xl border p-6 text-center dark:border-slate-800">
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We are here to help
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;