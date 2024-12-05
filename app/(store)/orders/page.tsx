import { formatCurrency } from "@/lib/formatCurrency";
import imageUrl from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="container mx-auto p-12 flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl">
          <h2 className="text-5xl font-black mb-8 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            No Orders Yet
          </h2>
          <p className="text-2xl text-gray-600 mb-8">
            Your order history is waiting to be filled
          </p>
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.orderNumber}
              className="group p-8 border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-md hover:scale-[1.02]"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 bg-gray-50/50 p-6 rounded-2xl">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Order Number
                  </p>
                  <p className="font-mono text-sm text-teal-600 break-all bg-teal-50/80 px-4 py-2 rounded-lg border border-teal-100">
                    {order.orderNumber}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Order Date
                  </p>
                  <p className="font-medium bg-white px-4 py-2 rounded-lg border border-gray-100">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Order Status and Total */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 mr-2">
                    Status
                  </span>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      order.status === "paid"
                        ? "bg-teal-100/80 text-teal-800 border border-teal-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {(order.status ?? "pending").charAt(0).toUpperCase() +
                      (order.status ?? "pending").slice(1)}
                  </span>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Total Paid
                  </p>
                  <p className="text-3xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-bold">
                    {formatCurrency(order.totalPrice ?? 0, order.currency)}
                  </p>
                </div>
              </div>

              {/* Discount Section */}
              {order.amountDiscount && (
                <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 shadow-sm">
                  <p className="text-red-600 font-semibold mb-2 text-lg flex items-center">
                    <span className="mr-2">🏷️</span>
                    Discount Applied:{" "}
                    {formatCurrency(order.amountDiscount, order.currency)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Original Subtotal:{" "}
                    <span className="line-through">
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </span>
                  </p>
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-6 bg-gray-50/50 p-6 rounded-2xl">
                {order.products?.map((product) => (
                  <div
                    key={product.product?._id}
                    className="flex items-center gap-6 py-6 border-t border-gray-100 first:border-t-0 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    {product.product?.image && (
                      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                        <Image
                          src={imageUrl(product.product.image).url()}
                          alt={product.product?.name ?? ""}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          fill
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {product.product?.name}
                      </h3>
                      <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg inline-block border border-gray-100">
                        Quantity: {product.quantity ?? "N/A"}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-700  px-4 py-2 rounded-lg border border-gray-100">
                      {product.product?.price && product.quantity
                        ? formatCurrency(
                            product.product?.price * product.quantity,
                            order.currency
                          )
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
