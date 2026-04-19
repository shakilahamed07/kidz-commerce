export const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* ইমেজ স্কেলেটন */}
        <div className="skeleton h-[400px] md:h-[500px] w-full rounded-3xl"></div>

        {/* ইনফো স্কেলেটন */}
        <div className="flex flex-col gap-6">
          
          {/* টাইটেল স্কেলেটন */}
          <div>
            <div className="skeleton h-10 w-3/4 mb-3"></div>
            <div className="skeleton h-6 w-1/2 mb-4"></div>
            <div className="flex gap-4">
              <div className="skeleton h-8 w-32 rounded-full"></div>
              <div className="skeleton h-8 w-20 rounded-full"></div>
            </div>
          </div>

          <div className="divider my-0"></div>

          {/* প্রাইস স্কেলেটন */}
          <div className="skeleton h-12 w-48"></div>

          {/* ডেসক্রিপশন স্কেলেটন */}
          <div>
            <div className="skeleton h-6 w-32 mb-3"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-5/6"></div>
          </div>

          {/* ফিচারস স্কেলেটন */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="skeleton h-4 w-2/3"></div>
            <div className="skeleton h-4 w-1/2"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>

          {/* বাটন স্কেলেটন */}
          <div className="flex gap-4 mt-4">
            <div className="skeleton h-14 flex-1 rounded-xl"></div>
            <div className="skeleton h-14 flex-1 rounded-xl"></div>
          </div>

          {/* QnA স্কেলেটন */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="skeleton h-16 w-full rounded-xl"></div>
            <div className="skeleton h-16 w-full rounded-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
};