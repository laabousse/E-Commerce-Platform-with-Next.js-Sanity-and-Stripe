import AddToBasketButton from "@/components/AddToBasketButton";
import imageUrl from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlurImage } from "@/components/BlurImage";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

// Add metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  return {
    title: product?.name,
    description: Array.isArray(product?.description)
      ? product.description[0]?._type === "block"
        ? product.description[0]?.children?.[0]?.text
        : undefined
      : undefined,
    openGraph: {
      images: [{ url: product?.image ? imageUrl(product.image).url() : "" }],
    },
  };
}

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>.Rerendered the product page cache for ${resolvedParams.slug ?? "unknown"}`
  );

  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-2xl shadow-xl 
            ${isOutOfStock ? "opacity-50" : ""} group`}
        >
          {product.image && (
            <BlurImage
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm">
              <span className="text-white font-bold text-2xl">
                Out of Stock
              </span>
            </div>
          )}
          {!isOutOfStock && product.stock && (
            <div className="absolute bottom-4 right-4 bg-emerald-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-emerald-200/50 transition-all duration-300 hover:bg-emerald-50/90">
              <span className="text-sm font-medium text-emerald-800 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {product.stock} in stock
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-8 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <div className="text-2xl font-semibold mb-6 text-emerald-600">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose prose-gray prose-lg max-w-none mb-8">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
