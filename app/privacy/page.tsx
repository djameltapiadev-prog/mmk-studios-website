import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — MMK Studios",
  description: "How MMK Studios collects, uses and protects your personal data, in compliance with GDPR (EU 2016/679) and Spanish LOPDGDD.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Legal</p>
        <h1 className="font-serif text-5xl text-[#f5f0e2] mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: 25 May 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>
            This Privacy Policy describes how MMK Studios (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
            collects, uses and protects personal data submitted through this website,
            in compliance with the EU General Data Protection Regulation 2016/679 (GDPR)
            and Spanish Organic Law 3/2018 on Data Protection (LOPDGDD).
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">1. Data controller</h2>
          <p>
            <strong>Djamel Tapia</strong>, trading as MMK Studios.<br />
            Madrid, Spain.<br />
            Contact: <a href="mailto:djameltapia.dev@gmail.com" className="text-[#c8a86e] hover:underline">djameltapia.dev@gmail.com</a>
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">2. Data we collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact form data:</strong> name, email and the message you submit, processed via our service provider Formspree.</li>
            <li><strong>AI interaction data:</strong> messages you type in our live AI demo. These are sent to third-party AI providers (Groq, Hugging Face, Google) to generate responses. We do NOT store the contents of your conversations on our servers.</li>
            <li><strong>Uploaded documents:</strong> if you upload a PDF in the chat demo, it is processed entirely in your browser. The text is sent to the AI provider only when you ask a question, and is never stored by us.</li>
            <li><strong>Technical data:</strong> standard server logs from our hosting provider (Vercel), including IP address, browser and timestamps, for security and abuse prevention.</li>
          </ul>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">3. Purpose and legal basis</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Responding to enquiries</strong> (Art. 6.1.b GDPR — pre-contractual measures)</li>
            <li><strong>Providing AI demos</strong> (Art. 6.1.b GDPR — execution of a service you requested)</li>
            <li><strong>Site security and abuse prevention</strong> (Art. 6.1.f GDPR — legitimate interest)</li>
          </ul>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">4. Third parties</h2>
          <p>We share data with the following processors:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel</strong> (USA) — hosting. Adequate safeguards under Standard Contractual Clauses.</li>
            <li><strong>Formspree</strong> (USA) — contact form processing.</li>
            <li><strong>Groq</strong> (USA) — AI chat inference.</li>
            <li><strong>Hugging Face</strong> (USA/EU) — AI image generation.</li>
            <li><strong>Google (Gemini API)</strong> (USA) — AI prompt enhancement.</li>
          </ul>
          <p>
            International data transfers to the USA occur under Standard Contractual Clauses
            and equivalent safeguards required by GDPR.
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">5. Retention</h2>
          <p>
            Contact enquiries are kept for as long as needed to respond and follow up,
            and deleted after 24 months of inactivity. AI conversation contents are not stored.
            Technical logs are retained for 90 days.
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">6. Your rights</h2>
          <p>
            Under GDPR you have the right to access, rectify, erase, restrict, port and
            object to the processing of your personal data, and to lodge a complaint with
            the Spanish Data Protection Authority (AEPD, <a href="https://www.aepd.es" className="text-[#c8a86e] hover:underline" target="_blank" rel="noopener">www.aepd.es</a>).
          </p>
          <p>
            To exercise your rights, contact us at <a href="mailto:djameltapia.dev@gmail.com" className="text-[#c8a86e] hover:underline">djameltapia.dev@gmail.com</a>.
            We will respond within one month.
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">7. Cookies</h2>
          <p>
            This website uses only essential cookies required for its operation.
            We do not use third-party advertising or tracking cookies. If we add analytics
            in the future, we will request your explicit consent via a cookie banner.
          </p>

          <h2 className="font-serif text-2xl text-[#c8a86e] mt-10">8. Changes</h2>
          <p>
            We may update this Privacy Policy. The &ldquo;Last updated&rdquo; date at the
            top of this page indicates the latest revision.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
