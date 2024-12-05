import ProductGrid from "@/components/ProductGrid";
import { SearchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await SearchProductsByName(query);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!products.length ? (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              <span className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                No results found
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No products found for &ldquo;{query}&rdquo;. Try adjusting your
              search terms.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              <span className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Results for &ldquo;{query}&rdquo;
              </span>
            </h1>
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl ring-1 ring-gray-200">
              <ProductGrid products={products} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
