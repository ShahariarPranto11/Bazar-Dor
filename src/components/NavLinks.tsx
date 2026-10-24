
import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();

  // API যদি categories-কে data property-এর মধ্যে দেয়
  const categories = Array.isArray(result) ? result : result.data;

  if (!Array.isArray(categories)) {
    throw new Error("Invalid categories API response");
  }

  return categories;
};

const NavLinks = async () => {
  const categories = await getCategories();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-green-700"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;

