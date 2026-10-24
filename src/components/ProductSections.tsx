
"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { getProducts } from "@/lib/api";
import ProductCard, { toBanglaNumber } from "@/components/ProductCard";

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white p-3"
        >
          <div className="flex gap-3">
            <div className="size-10 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-2/3 rounded bg-gray-200" />
              <div className="h-2 w-1/3 rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-5 h-3 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function SectionHeading({
  title,
  icon,
  color,
}: {
  title: string;
  icon?: string;
  color?: string;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-800">
      {icon && <span className={color}>{icon}</span>}
      {title}
    </h2>
  );
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (active) {
          setProducts(data);
          setError("");
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
  }, []);

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const gridClass =
    "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (loading) {
    return (
      <section className="bg-[#f1f6f1] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <div className="mb-3 h-5 w-44 animate-pulse rounded bg-gray-200" />
            <ProductSkeleton />
          </div>
          <div>
            <div className="mb-3 h-5 w-44 animate-pulse rounded bg-gray-200" />
            <ProductSkeleton />
          </div>
          <div>
            <div className="mb-3 h-5 w-32 animate-pulse rounded bg-gray-200" />
            <ProductSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#f1f6f1] px-4 py-12 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-sm mt-4 bg-green-700 text-white hover:bg-green-800"
        >
          আবার চেষ্টা করো
        </button>
      </section>
    );
  }

  const sections = [
    { title: "আজ দাম বেড়েছে", icon: "▲", color: "text-green-600", items: risers },
    { title: "আজ দাম কমেছে", icon: "▼", color: "text-red-500", items: fallers },
  ];

  return (
    <section className="bg-[#f1f6f1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <SectionHeading
              title={section.title}
              icon={section.icon}
              color={section.color}
            />

            {section.items.length > 0 ? (
              <div className={gridClass}>
                {section.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                এই মুহূর্তে কোনো তথ্য নেই।
              </p>
            )}
          </section>
        ))}

        <section id="সব-পণ্য" className="scroll-mt-6">
          <SectionHeading title="সব পণ্য" />

          <p className="mb-3 text-xs text-gray-500">
            মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>

          {products.length > 0 ? (
            <div className={gridClass}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              কোনো পণ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
