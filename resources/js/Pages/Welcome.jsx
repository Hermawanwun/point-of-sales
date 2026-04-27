import { Head, Link } from "@inertiajs/react";
import {
    IconShoppingCart,
    IconReceipt,
    IconUsers,
    IconChartBar,
    IconBox,
    IconBrandGithub,
    IconArrowRight,
    IconCheck,
    IconDeviceMobile,
    IconCloudLock,
    IconReportMoney,
} from "@tabler/icons-react";

export default function Welcome() {
    const features = [
        {
            icon: IconShoppingCart,
            title: "Transaksi Cepat",
            desc: "Proses jual beli dalam hitungan detik",
        },
        {
            icon: IconReceipt,
            title: "Cetak Struk",
            desc: "Print thermal 58mm, 80mm, dan invoice",
        },
        {
            icon: IconUsers,
            title: "Pelanggan & History",
            desc: "Kelola data pelanggan dan riwayat",
        },
        {
            icon: IconBox,
            title: "Inventori Produk",
            desc: "Stok, kategori, dan barcode scanner",
        },
        {
            icon: IconChartBar,
            title: "Laporan Lengkap",
            desc: "Penjualan, keuntungan, dan grafik",
        },
        {
            icon: IconReportMoney,
            title: "Multi Payment",
            desc: "Tunai, QRIS, dan Midtrans",
        },
    ];

    const techStack = [
        { name: "Laravel 12", color: "bg-red-500" },
        { name: "Inertia.js", color: "bg-purple-500" },
        { name: "React", color: "bg-cyan-500" },
        { name: "TailwindCSS", color: "bg-sky-500" },
        { name: "MySQL", color: "bg-orange-500" },
    ];

    return (
        <>
            <Head title="Plantora - Point of Sale Modern" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
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

               

                

                {/* Features Section */}
                <section
                    id="features"
                    className="py-20 px-6 bg-white dark:bg-slate-900"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                Fitur Lengkap
                            </h2>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                Semua yang Anda butuhkan untuk mengelola bisnis
                                retail dalam satu aplikasi
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon
                                            size={24}
                                            className="text-white"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section id="tech" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Tech Stack
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-12">
                            Dibangun dengan teknologi modern yang cepat dan
                            stabil
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {techStack.map((tech, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                                >
                                    <div
                                        className={`w-3 h-3 rounded-full ${tech.color}`}
                                    />
                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <IconShoppingCart
                                    size={16}
                                    className="text-white"
                                />
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                Plantora
                            </span>
                        </div> */}
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Dibuat oleh Wanwinwun
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
