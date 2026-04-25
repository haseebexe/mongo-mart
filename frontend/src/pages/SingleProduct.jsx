import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProductData } from "@/context/ProductContext";
import { useUserData } from "@/context/UserContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { fetchProduct, product, relatedProducts, loading } = useProductData();

  const { isAuth } = useUserData();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {product && (
            <div className="flex flex-col lg:flex-row items-start gap-14">
              <div className="w-[290px] md:w-[650px]">
                <Carousel>
                  <CarouselContent>
                    {product.images &&
                      product.images.map((item, index) => (
                        <CarouselItem key={index}>
                          <img src={item.url} className="w-full rounded-md" />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>

                <p className="text-lg">{product.description}</p>

                <p className="text-xl font-semibold">
                  Rs{" "}
                  {product.price?.toLocaleString("en-PK", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                {isAuth ? (
                  product.stock <= 0 ? (
                    <p className="text-red-600 text-2xl">Out of stock</p>
                  ) : (
                    <Button size="lg" className="py-5 px-6 cursor-pointer">
                      Add to cart
                    </Button>
                  )
                ) : (
                  <p className="text-blue-500">
                    Please login to add something in cart
                  </p>
                )}
              </div>
            </div>
          )}

          {relatedProducts?.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 text-xl font-bold">Related Products</h2>

              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {relatedProducts.map((item) => (
                    <CarouselItem
                      key={item._id}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                    >
                      <div className="h-full">
                        <ProductCard product={item} latest="no" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
