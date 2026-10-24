

import type { Product } from "@/types/product";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

// Get all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  let data: unknown = result;

  if (
    typeof result === "object" &&
    result !== null &&
    !Array.isArray(result)
  ) {
    const payload = result as Record<string, unknown>;
    data = payload.data ?? result;
  }

  if (!Array.isArray(data)) {
    throw new Error("API থেকে সঠিক product list পাওয়া যায়নি");
  }

  return data as Product[];
}

// Get one product by slug
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return null;
  }

  const response = await fetch(`${API_URL}/${product.id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের বিস্তারিত তথ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  if (typeof result === "object" && result !== null) {
    const payload = result as Record<string, unknown>;
    const data = payload.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "id" in data
    ) {
      return data as Product;
    }

    if ("id" in result) {
      return result as Product;
    }
  }

  return product;
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}?category=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির পণ্য লোড করা যায়নি");
  }

  const result: unknown = await response.json();

  let data: unknown = result;

  if (
    typeof result === "object" &&
    result !== null &&
    !Array.isArray(result)
  ) {
    const payload = result as Record<string, unknown>;
    data = payload.data ?? result;
  }

  if (!Array.isArray(data)) {
    console.error("Unexpected category API response:", result);
    throw new Error("API থেকে সঠিক category product list পাওয়া যায়নি");
  }

  return data as Product[];
}

