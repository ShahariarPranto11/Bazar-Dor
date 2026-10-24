import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function bn(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
}

function money(value: number): string {
  return `${bn(Math.round(value).toLocaleString("en-US"))} টাকা`;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  // Average of each market's midpoint: (min + max) / 2
  const averagePrice = markets.length
    ? markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      markets.length
    : product.today;

  const change = product.change;
  const changeColor =
    change.dir === "up"
      ? "text-green-700 bg-green-50"
      : change.dir === "down"
        ? "text-red-600 bg-red-50"
        : "text-gray-600 bg-gray-100";

  const changeLabel =
    change.dir === "up"
      ? `▲ ${bn(Math.abs(change.pct).toFixed(1))}% দাম বেড়েছে`
      : change.dir === "down"
        ? `▼ ${bn(Math.abs(change.pct).toFixed(1))}% দাম কমেছে`
        : "— ০.০% দাম অপরিবর্তিত";

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-green-800 hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        {/* Product summary */}
        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#f1f6f1] text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {product.categoryNameBn} · {product.unit}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {product.unit === "kg"
                    ? "প্রতি কেজি"
                    : product.unit === "liter"
                      ? "প্রতি লিটার"
                      : product.unit === "dozen"
                        ? "প্রতি ডজন"
                        : product.unit === "piece"
                          ? "প্রতি পিস"
                          : `প্রতি ${product.unit}`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-bold text-gray-900">
                {money(product.today)}
              </p>

              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${changeColor}`}
              >
                {changeLabel}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500">
              গতকাল: {money(product.yesterday)} · গত সপ্তাহ:{" "}
              {money(product.lastWeek)} · গত মাস: {money(product.lastMonth)}
            </p>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            বাজারদরের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PriceSummary
              title="সর্বনিম্ন দাম"
              value={minPrice}
              color="text-green-700"
            />

            <PriceSummary
              title="সর্বোচ্চ দাম"
              value={maxPrice}
              color="text-red-600"
            />

            <PriceSummary
              title="গড় বাজারদর"
              value={averagePrice}
              color="text-gray-900"
            />
          </div>

          <p className="mt-3 text-xs text-gray-500">
            গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবিন্দুর গড়
            হিসেবে হিসাব করা হয়েছে।
          </p>
        </section>

        {/* Market-wise prices */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-130 text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">বাজার</th>
                      <th className="px-4 py-3 font-semibold">বিভাগ</th>
                      <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                      <th className="px-4 py-3 font-semibold">সর্বোচ্চ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className="border-t border-gray-100"
                      >
                        <td className="px-4 py-4 font-medium text-gray-800">
                          {market.market}
                        </td>
                        <td className="px-4 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="px-4 py-4 text-green-700">
                          {money(market.min)}
                        </td>
                        <td className="px-4 py-4 text-red-600">
                          {money(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-white p-5 text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function PriceSummary({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-3 text-xl font-bold ${color}`}>{money(value)}</p>
    </div>
  );
}
