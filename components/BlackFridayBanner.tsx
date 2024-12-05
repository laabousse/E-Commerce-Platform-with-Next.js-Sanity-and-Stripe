// Server Component
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { BannerContent } from "./BannerContent";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }

  return <BannerContent sale={sale} />;
}

export default BlackFridayBanner;
