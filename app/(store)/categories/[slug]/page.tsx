import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>>.Rerendered the categories page cache for ${slug}`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
            {slug
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            Collection
          </h1>
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 md:p-8">
            <ProductsView products={products} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
