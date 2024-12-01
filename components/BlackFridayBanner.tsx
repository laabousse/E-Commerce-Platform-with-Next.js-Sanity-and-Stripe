import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-red-700 to-black text-white rounded-lg overflow-hidden shadow-lg">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-grow pr-4">
            <h2
              className="text-2xl font-bold tracking-tight mb-1 line-clamp-2 
              animate-pulse-soft text-opacity-100 transition-opacity duration-1000"
            >
              {sale.title}
            </h2>
            <p
              className="text-sm text-gray-200 mb-3 line-clamp-2 
              animate-pulse-subtle text-opacity-100 transition-opacity duration-1000"
            >
              {sale.description}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-end">
            <div className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2 shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">Code:</span>
                <span className="text-red-600 text-sm font-bold">
                  {sale.couponCode}
                </span>
              </div>
              <div className="h-4 border-l border-gray-300 mx-2"></div>
              <div className="text-sm font-bold">
                {sale.discountAmount}% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
