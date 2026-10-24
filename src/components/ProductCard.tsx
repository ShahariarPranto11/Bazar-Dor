
import Link from "next/link";
import type { Product } from "@/types/product";

function toBanglaNumber(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

function formatPrice(price: number): string {
  return `${toBanglaNumber(price.toLocaleString("en-US"))} টাকা`;
}

function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    gram: "প্রতি গ্রাম",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

export { toBanglaNumber, formatPrice, getUnitLabel };

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;

  const badgeStyle =
    dir === "up"
      ? "bg-green-50 text-green-700"
      : dir === "down"
        ? "bg-red-50 text-red-600"
        : "bg-gray-100 text-gray-500";

  const badgeText =
    dir === "up"
      ? `▲ ${toBanglaNumber(Math.abs(pct).toFixed(1))}%`
      : dir === "down"
        ? `▼ ${toBanglaNumber(Math.abs(pct).toFixed(1))}%`
        : "— ০.০%";

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatPrice(product.today)}`}
      className="group block min-w-0 rounded-xl border border-gray-200
        bg-white p-3 transition duration-200
        hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-green-500"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-gray-800">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">আজকের দাম</p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>

          <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${badgeStyle}`}>
            {badgeText}
          </span>
        </div>
      </div>
    </Link>
  );
}
