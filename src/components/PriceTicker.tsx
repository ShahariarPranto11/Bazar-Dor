
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Product = {
  id: string | number;
  nameBn: string;
  image?: string;
  unit: string;
  today: number;
  change?: {
    dir: "up" | "down";
    pct: number;
  };
};

const formatBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  const products = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  return products;
};

const PriceTicker = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="flex overflow-hidden border-b border-gray-200 bg-white">
      <div className="z-10 shrink-0 bg-green-700 px-4 py-3 text-sm font-bold text-white">
        বাজারদর
      </div>

      <div className="min-w-0 flex-1 overflow-hidden">
        <MarqueeText className="py-3" direction="right" duration={30}>
          
{products.map((product) => (
  <span
    key={product.id}
    className="mx-5 inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
  >
    <span>{product.image || "🛒"}</span>

    <span className="font-medium text-gray-700">
      {product.nameBn}
    </span>

    <span className="font-bold text-gray-900">
      ৳{formatBanglaNumber(product.today)}
    </span>

    <span className="text-gray-500">
      /{product.unit === "kg" ? "কেজি" : product.unit}
    </span>

    {product.change && (
      <span
        className={
          product.change.dir === "up"
            ? "font-semibold text-red-600"
            : "font-semibold text-green-600"
        }
      >
        {product.change.dir === "up" ? "▲" : "▼"}{" "}
      {formatBanglaNumber(product.change.pct)}%
      </span>
    )}
  </span>
))}

        </MarqueeText>
      </div>
    </div>
  );
};

export default PriceTicker;

