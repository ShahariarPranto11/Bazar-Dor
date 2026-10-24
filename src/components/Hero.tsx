
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="bg-[#f0f5f0] px-4 py-4 sm:py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-[#fbfdfb] px-5 py-6 sm:px-8 md:flex-row md:px-3 md:py-5">

        {/* Left Side */}
        <div className="w-full md:w-[60%]">
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {date}
          </p>

          <h1 className="text-2xl font-bold leading-tight text-[#202b24] sm:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক নির্ভরযোগ্য তথ্য, গড়, সর্বনিম্ন-
            সর্বোচ্চ এবং দামের সর্বশেষ আপডেট।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-5 inline-block rounded-md bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="flex w-full items-center justify-center md:w-[40%]">
          <div className="relative h-40 w-48 sm:h-48 sm:w-56">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের তাজা ফল ও সবজির ঝুড়ি"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
