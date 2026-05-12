import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import CartButton from "../buttons/CartButton";

export const ProductCard = ({ product }) => {
  const discountAmount = (product.price * product.discount) / 100;
  const finalPrice = product.price - discountAmount;

  return (
    <div className="card w-full  max-w-sm bg-base-100 shadow-xl border border-base-200 transition-transform duration-300 hover:scale-[1.02]">
      <Link href={`/products/${product._id}`}>
        <figure className="sm:px-4 px-3 sm:pt-4 pt-3 relative">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={150}
            className="rounded-xl sm:h-52 h-20  object-cover w-full bg-base-200"
          />
          {product.discount > 0 && (
            <div className="badge badge-secondary absolute top-6 right-6 font-bold">
              -{product.discount}%
            </div>
          )}
        </figure>

        <div className="card-body  sm:p-5 p-3">
          <h2
            className="card-title sm:text-lg text-xs font-bold line-clamp-2"
            title={product.title}
          >
            {product.title}
          </h2>

          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-1 text-warning">
              <FaStar />
              <span className="sm:text-sm text-xs font-semibold text-base-content">
                {product.ratings}
              </span>
            </div>
            <div className="sm:text-sm text-xs text-gray-500 font-medium">
              {product.sold} Sold
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mb-4">
            <span className="sm:text-xl text-xs font-bold text-primary">
              ৳{finalPrice}
            </span>
            {product.discount > 0 && (
              <span className="sm:text-xl text-xs line-through text-gray-400">
                ৳{product.price}
    
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="pb-4 sm:px-5 px-3 mt-auto">
        <CartButton product={product}></CartButton>
      </div>
    </div>
  );
};
