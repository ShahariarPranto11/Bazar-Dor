
export default function ProductDetailLoading() {
  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-36 rounded bg-gray-200" />

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-gray-200" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-48 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-100" />
            </div>
          </div>

          <div className="mt-8 h-4 w-24 rounded bg-gray-200" />
          <div className="mt-3 h-8 w-40 rounded bg-gray-200" />
        </div>

        <div className="mt-8 h-5 w-48 rounded bg-gray-200" />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-200" />
          ))}
        </div>

        <div className="mt-8 h-5 w-52 rounded bg-gray-200" />
        <div className="mt-4 h-64 rounded-2xl bg-gray-200" />
      </div>
    </main>
  );
}
