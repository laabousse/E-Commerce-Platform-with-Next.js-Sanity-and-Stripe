import imageUrl from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import AddToBasketButton from "./AddToBasketButton";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {product.image && (
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width:768px) 100vw, (max-height:1200px) 50vw, 33vw"
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
            <span className="text-white font-bold text-lg px-4 py-2 rounded-full bg-black/50">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-500 transition-colors duration-200">
          {product.name}
        </h2>
        <p className="mt-2 text-sm text-gray-700 line-clamp-2 flex-1">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No description available"}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </p>
          <div onClick={(e) => e.preventDefault()}>
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductThumb;
