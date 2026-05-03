import Link from 'next/link';
import React from 'react';
import { HiOutlineLightBulb, HiOutlineHeart, HiOutlineShieldCheck } from 'react-icons/hi';
import { MdOutlineRocketLaunch, MdOutlineWorkspacePremium } from 'react-icons/md';

const AboutPage = () => {
  return (
    <div className="bg-base-100 pt-5">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight italic">
            Empowering the <span className="text-primary text-outline">Next Generation</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Kidz Commerce is more than just a toy store. We are a team of educators, parents, and dreamers dedicated to bringing world-class educational toys to every child in Bangladesh.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 px-6 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800" 
              alt="Kids learning" 
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-2xl hidden lg:block">
              <p className="text-2xl font-black">1000+</p>
              <p className="text-xs uppercase font-bold tracking-widest">Educational Products</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold italic">Our Story & Mission</h2>
            <p className="text-gray-600">
              Founded in 2026, <strong>Kidz Commerce</strong> was born out of a simple need: to provide children with toys that stimulate the brain, not just keep them busy. We believe that play is the highest form of research.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl h-fit">
                  <MdOutlineRocketLaunch size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Innovation in Play</h4>
                  <p className="text-sm text-gray-500">We curate toys that encourage critical thinking and STEM skills.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl h-fit">
                  <HiOutlineHeart size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Safety First</h4>
                  <p className="text-sm text-gray-500">Every product is tested for child safety and toxic-free materials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-base-200 py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center mb-16">
          <h2 className="text-3xl font-black uppercase mb-4">Why Parents Trust Us</h2>
          <div className="divider w-24 mx-auto divider-primary"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MdOutlineWorkspacePremium size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
             <p className="text-gray-500 text-sm">We only stock world-class educational brands that meet international standards.</p>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
             <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineLightBulb size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3">Expert Curated</h3>
             <p className="text-gray-500 text-sm">Our selection is reviewed by educational experts to ensure real learning value.</p>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 p-8 shadow-sm hover:shadow-xl transition-all border border-base-300 group">
             <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HiOutlineShieldCheck size={32} />
             </div>
             <h3 className="text-xl font-bold mb-3">Trusted Delivery</h3>
             <p className="text-gray-500 text-sm">With our fast Home Delivery and Cash on Delivery, shopping is stress-free.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center px-6">
         <h2 className="text-3xl font-black mb-6 italic uppercase">Ready to Start the Learning Journey?</h2>
         <Link href="/products" className="btn btn-primary btn-lg rounded-full px-12 shadow-xl shadow-primary/30">
            Browse our Products
         </Link>
      </section>
    </div>
  );
};

export default AboutPage;
