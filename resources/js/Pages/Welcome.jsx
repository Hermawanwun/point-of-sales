import { Head, Link } from "@inertiajs/react";
import { IconShoppingCart } from "@tabler/icons-react";

export default function Welcome() {
    return (
        <>
            <Head title="Plantora - Point of Sale Modern" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <IconShoppingCart
                                    size={22}
                                    className="text-white"
                                />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                Plantora
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-500 transition-colors"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all"
                            >
                                Daftar Gratis
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <footer className="mt-auto px-4 py-6 sm:px-6 sm:py-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto flex justify-end">
                        <p className="text-xs sm:text-sm text-slate-500 text-right">
                            &copy; {new Date().getFullYear()} Dibuat oleh
                            Wanwinwun
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
