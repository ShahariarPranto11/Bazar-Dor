
export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f1f6f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-5 h-8 w-56 rounded bg-gray-200" />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-64 rounded-2xl bg-white p-5"
            >
              <div className="size-14 rounded-xl bg-gray-200" />
              <div className="mt-5 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
              <div className="mt-8 h-8 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
