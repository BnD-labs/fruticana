"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gradient">Fruticana</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium cold-pressed juices crafted for the discerning palate.
                            Experience the future of freshness.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    Bestsellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    Bundles
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-brand-orange transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Stay Fresh</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get updates on new flavors and exclusive offers.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-orange transition-colors"
                                aria-label="Email address"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full px-4 py-2 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-orange/30 transition-all"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                    <p>&copy; 2026 Fruticana. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-brand-orange transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-brand-orange transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-brand-orange transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
