"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type BlurImageProps = ImageProps & {
  alt: string;
};

export function BlurImage(props: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      className={`
        duration-700 ease-in-out
        ${isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"}
        ${props.className || ""}
      `}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
}
