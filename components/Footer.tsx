import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f2e] mt-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border border-[#c8a86e] flex items-center justify-center">
                <span className="text-[#c8a86e] font-serif text-lg font-bold">M</span>
              </div>
              <div>
                <div className="font-serif text-xl text-[#f5f0e2]">MMK</div>
                <div className="text-[10px] tracking-[0.3em] text-[#c8a86e]">STUDIOS</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              AI solutions and automations for businesses that want to move fast.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f0e2] mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/chat" className="hover:text-[#c8a86e]">AI Chatbots</Link></li>
              <li><Link href="/images" className="hover:text-[#c8a86e]">Image Generation</Link></li>
              <li><Link href="/about" className="hover:text-[#c8a86e]">Automations</Link></li>
              <li><Link href="/contact" className="hover:text-[#c8a86e]">Custom Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f0e2] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#c8a86e]">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#c8a86e]">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#c8a86e]">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-[#c8a86e]">Terms</Link></li>
              <li>
                <a href="https://github.com/djameltapiadev-prog" target="_blank" rel="noopener" className="hover:text-[#c8a86e]">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f0e2] mb-4">Get in touch</h4>
            <p className="text-sm text-gray-400 mb-2">djameltapia.dev@gmail.com</p>
            <p className="text-sm text-gray-400">Madrid, Spain</p>
          </div>
        </div>

        <div className="border-t border-[#1f1f2e] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 MMK Studios. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
