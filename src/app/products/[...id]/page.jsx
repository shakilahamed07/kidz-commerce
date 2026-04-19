import { getSinglePoducts } from "@/action/server/products";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import React from "react";
import { FaStar, FaShoppingCart, FaBolt, FaCheckCircle } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSinglePoducts(id[0]);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDeteils({ params }) {
  const { id } = await params;
  const product = (await getSinglePoducts(id[0])) || {};
  const discountAmount = (product.price * product.discount) / 100;
  const finalPrice = product.price - discountAmount;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* বাম পাশ: ইমেজ সেকশন */}
        <div className="relative  justify-center items-center bg-base-200 rounded-3xl p-6 shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            className="rounded-2xl object-cover w-full max-w-md h-auto"
          />
          {product.discount > 0 && (
            <div className="badge badge-secondary badge-lg absolute top-8 right-8 font-bold text-lg p-4 shadow-lg">
              -{product.discount}% OFF
            </div>
          )}
        </div>

        {/* ডান পাশ: প্রোডাক্ট ইনফো */}
        <div className="flex flex-col gap-6">
          {/* টাইটেল এবং রেটিং */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              {product.title}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{product.bangla}</p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-warning bg-warning/10 px-3 py-1 rounded-full">
                <FaStar />
                <span className="font-bold text-base-content">
                  {product.ratings}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews} Reviews)
                </span>
              </div>
              <div className="badge badge-ghost badge-md">
                {product.sold} Sold
              </div>
            </div>
          </div>

          <div className="divider my-0"></div>

          {/* প্রাইস */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-primary">
              ৳{finalPrice}
            </span>
            {product.discount > 0 && (
              <span className="text-xl line-through text-gray-400 mb-1">
                ৳{product.price}
              </span>
            )}
          </div>

          {/* ডেসক্রিপশন */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-base-content/80 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* কী ফিচারস (Info) */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="flex flex-col gap-2">
              {product.info.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-base-content/80"
                >
                  <FaCheckCircle className="text-success flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* অ্যাকশন বাটন */}
          <div className="flex gap-4 mt-4">
            <CartButton product={product}></CartButton>
            <button className="btn btn-secondary flex-1 shadow-lg">
              <FaBolt className="mr-2" /> Buy Now
            </button>
          </div>

          {/* প্রশ্নোত্তর (QnA) - DaisyUI Collapse */}
          {product.qna && product.qna.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">
                Questions & Answers
              </h3>
              <div className="flex flex-col gap-3">
                {product.qna.map((item, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-200 rounded-box"
                  >
                    <input
                      type="radio"
                      name="qna-accordion"
                      defaultChecked={index === 0}
                    />
                    <div className="collapse-title text-md font-medium text-base-content">
                      {item.question}
                    </div>
                    <div className="collapse-content text-base-content/70">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
