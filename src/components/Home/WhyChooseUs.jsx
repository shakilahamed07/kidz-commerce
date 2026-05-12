import React from "react";
import { HiOutlineLightBulb, HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export default function WhyChooseUs() {
  return (
    <div className="py-20 bg-base-200 px-6">
      <section className="">
        <div className="container mx-auto max-w-6xl text-center mb-16">
          <h2 className="sm:text-2xl font-black uppercase mb-4">
            Why Parents Trust Us
          </h2>
          <div className="divider w-24 mx-auto divider-primary"></div>
        </div>

        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MdOutlineWorkspacePremium size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
            <p className="text-gray-500 text-sm">
              We only stock world-class educational brands that meet
              international standards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HiOutlineLightBulb size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Curated</h3>
            <p className="text-gray-500 text-sm">
              Our selection is reviewed by educational experts to ensure real
              learning value.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <HiOutlineShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Trusted Delivery</h3>
            <p className="text-gray-500 text-sm">
              With our fast Home Delivery and Cash on Delivery, shopping is
              stress-free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
