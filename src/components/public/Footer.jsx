export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Soft Blue Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-sky-400/10 to-transparent blur-2xl"></div>

      <div className="relative bg-slate-950 text-slate-300 border-t border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* BRAND */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  ProductStore
                </span>
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Platform katalog produk modern dengan kualitas terpercaya,
                desain elegan, dan pengalaman pengguna terbaik.
              </p>
            </div>

            {/* KONTAK */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Kontak
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-blue-400 transition">
                  📧 2400016068@webmail.uad.ac.id
                </li>
                <li className="hover:text-blue-400 transition">
                  📞 +62 877-8324-3575
                </li>
              </ul>
            </div>

            {/* INFO */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Informasi
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-blue-400 transition cursor-pointer">
                  Tentang Kami
                </li>
                <li className="hover:text-blue-400 transition cursor-pointer">
                  Kebijakan Privasi
                </li>
                <li className="hover:text-blue-400 transition cursor-pointer">
                  Syarat & Ketentuan
                </li>
              </ul>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="mt-14 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            © 2025{" "}
            <span className="text-slate-300 font-medium">ProductStore</span>.
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
