"use client";

import Tilt from "react-parallax-tilt";

type Sale = {
  title?: string;
  description?: string;
  couponCode?: string;
  discountAmount?: number;
};

export function BannerContent({ sale }: { sale: Sale }) {
  return (
    <Tilt
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      perspective={1500}
      scale={1.02}
      transitionSpeed={2500}
      gyroscope={true}
      className="w-full"
    >
      <div
        className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 text-white rounded-2xl overflow-hidden 
                    shadow-[0_10px_30px_rgba(16,_185,_129,_0.3)] backdrop-blur-sm 
                    hover:shadow-[0_10px_30px_rgba(37,_99,_235,_0.3)] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-8 py-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-grow space-y-4">
              <h2
                className="text-4xl font-bold tracking-tight line-clamp-2 animate-pulse-soft 
                           bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent
                           drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]"
              >
                {sale.title}
              </h2>
              <p
                className="text-base text-gray-100/90 line-clamp-2 animate-pulse-subtle
                          font-medium leading-relaxed max-w-2xl"
              >
                {sale.description}
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="group hover:scale-105 transition-all duration-500 ease-out">
                <div
                  className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl 
                              flex items-center space-x-4 shadow-xl
                              border border-white/20 hover:border-white/40
                              hover:bg-white/15"
                >
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-medium text-gray-100/80 uppercase tracking-wider">
                      Discount Code
                    </span>
                    <span
                      className="text-lg font-bold group-hover:text-pink-200 transition-colors
                                   drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]"
                    >
                      {sale.couponCode}
                    </span>
                  </div>
                  <div className="h-12 border-l border-white/20 group-hover:border-white/40"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-gray-100/80 uppercase tracking-wider">
                      Save
                    </span>
                    <span
                      className="text-2xl font-bold group-hover:text-pink-200 transition-colors
                                   drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]"
                    >
                      {sale.discountAmount}% OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
