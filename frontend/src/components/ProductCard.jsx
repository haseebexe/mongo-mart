import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ product, latest }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  return (
    product && (
      <div className="w-full max-w-[300px] mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200">
        <Link to={`/product/${product._id}`}>
          <div className="relative h-[300px] bg-gray-100 overflow-hidden group">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
              }}
            >
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={product.title}
                  className="w-full h-full object-contain flex-shrink-0"
                />
              ))}
            </div>

            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  ←
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  →
                </button>
              </>
            )}

            {latest === "yes" && (
              <Badge className="absolute top-2 left-2">New</Badge>
            )}
          </div>
        </Link>

        <div className="p-4">
          <h3 className="text-lg font-semibold truncate w-[99%]">
            {product.title.slice(0, 30)}
          </h3>
          <p className="text-sm mt-1 line-clamp-2">{product.description}</p>
          <p className="mt-2 text-lg font-medium text-gray-900">
            Rs{" "}
            {product.price.toLocaleString("en-PK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <div className="mt-5 flex justify-center">
            <Button
              className="w-full cursor-pointer rounded-xl"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              View Product
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
