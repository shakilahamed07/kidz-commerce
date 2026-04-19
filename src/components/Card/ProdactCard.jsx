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
      <figure className="px-4 pt-4 relative">
        {/* Next.js <Image /> ব্যবহার করতে পারেন, তবে next.config.js এ ডোমেইন অ্যাড করতে হবে। তাই <img> ব্যবহার করা হলো */}
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={150}
          className="rounded-xl h-52 object-cover w-full bg-base-200"
        />
        {product.discount > 0 && (
          <div className="badge badge-secondary absolute top-6 right-6 font-bold">
            -{product.discount}%
          </div>
        )}
      </figure>

      <div className="card-body  p-5">
        <h2
          className="card-title text-lg font-bold line-clamp-2"
          title={product.title}
        >
          {product.title}
        </h2>

        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1 text-warning">
            <FaStar />
            <span className="text-sm font-semibold text-base-content">
              {product.ratings}
            </span>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {product.sold} Sold
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="text-2xl font-bold text-primary">৳{finalPrice}</span>
          {product.discount > 0 && (
            <span className="text-sm line-through text-gray-400">
              ৳{product.price}
            </span>
          )}
        </div>

        <div className="card-actions mt-auto justify-between">
          <Link
            href={`/products/${product._id}`}
            className="btn btn-outline btn-primary flex-1"
          >
            <FaEye /> View Details
          </Link>
          <div className="flex-1">
            <CartButton product={product}></CartButton>
          </div>
        </div>
      </div>
    </div>
  );
};
