import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">About</p>
        <h1 className="font-serif text-5xl md:text-6xl text-[#f5f0e2] leading-tight mb-6">
          Built on speed, shipped with care
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          MMK Studios is a small studio that builds AI tools for businesses
          that want to move fast without compromising quality.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-3xl text-[#c8a86e] mb-4">Our approach</h2>
            <p className="text-gray-300 leading-relaxed">
              We use AI as an accelerator, not as a shortcut. Every line of code
              is reviewed. Every interface is tested. Every project is documented
              so your team can extend it without us.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-[#c8a86e] mb-4">Why we exist</h2>
            <p className="text-gray-300 leading-relaxed">
              Small businesses can&apos;t afford a $200k SaaS contract or a six-month
              custom build. They need solutions that work next week, cost what they can pay,
              and don&apos;t lock them in. That&apos;s what we deliver.
            </p>
          </div>
        </div>

        <div className="border-t border-[#1f1f2e] pt-12">
          <h2 className="font-serif text-3xl text-[#c8a86e] text-center mb-10">What we value</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Honesty over hype", desc: "We tell you when AI is not the answer. Sometimes a spreadsheet is enough." },
              { title: "Speed over perfection", desc: "Ship the 80% that works, iterate based on real feedback." },
              { title: "Ownership", desc: "You own the code, the data, the relationship. No vendor lock-in." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-serif text-xl text-[#f5f0e2] mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#f5f0e2] mb-6">Ready to talk?</h2>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
        >
          Get in touch
        </Link>
      </section>

      <Footer />
    </>
  );
}
