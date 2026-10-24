"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard, { toBanglaNumber } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/api";
import type { Product } from "@/types/product";

type SortOption = "default" | "low" | "high" | "change";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductsByCategory(slug);

        if (active) {
          setProducts(data);
        }
      } catch {
        if (active) {
          setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sort) {
      case "low":
        return result.sort((a, b) => a.today - b.today);
      case "high":
        return result.sort((a, b) => b.today - a.today);
      case "change":
        return result.sort(
          (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct),
        );
      default:
        return result;
    }
  }, [products, sort]);

  const categoryName = products[0]?.categoryNameBn;

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm text-gray-500">হোম / ক্যাটাগরি</p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {categoryName
                  ? `${categoryName} পণ্যসমূহ`
                  : "ক্যাটাগরির পণ্যসমূহ"}
              </h1>

              {!loading && !error && (
                <p className="mt-2 text-sm text-gray-600">
                  মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <span className="shrink-0">সাজান:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-green-600"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low">দাম: কম থেকে বেশি</option>
                <option value="high">দাম: বেশি থেকে কম</option>
                <option value="change">দামের পরিবর্তন</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="size-14 rounded-xl bg-gray-200" />
                <div className="mt-5 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
                <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-white p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
            >
              আবার চেষ্টা করো
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-16 text-center">
            <p className="text-4xl">🛒</p>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              অন্য একটি ক্যাটাগরি নির্বাচন করে দেখো।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
