import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6 text-center relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[400px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(200,168,110,0.18) 0%, rgba(200,168,110,0.06) 40%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="font-serif text-[10rem] leading-none text-[#c8a86e] mb-2">404</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f5f0e2] mb-4">
            Page not found
          </h1>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            The page you&apos;re looking for has been moved, deleted, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-[#c8a86e] text-[#c8a86e] font-semibold rounded-md hover:bg-[#c8a86e]/10 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
