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

const Home = () => {
  const navigate = useNavigate();
  const { newProd } = useProductData();

  return (
    <div>
      <Hero navigate={navigate} />

      <div className="mt-6 px-4">
        <h1 className="text-3xl mb-6 font-bold">Latest Products</h1>

        {newProd?.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {newProd.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard product={item} latest="yes" />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p>No products yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;