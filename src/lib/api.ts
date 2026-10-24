
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const result = await response.json();

  const data = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(data)) {
    throw new Error("API থেকে সঠিক product list পাওয়া যায়নি");
  }

  return data as Product[];
}
