"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProduct = products[currentIndex];

    // Reset scroll position when changing products
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const goToProduct = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Canvas Scroll Section */}
                    <section className="relative">
                        <ProductBottleScroll product={currentProduct} />
                        <ProductTextOverlays product={currentProduct} />
                    </section>

                    {/* Product Details Section */}
                    <section
                        className="relative py-24 px-6"
                        style={{
                            background: `linear-gradient(135deg, ${currentProduct.color.primary} 0%, ${currentProduct.color.secondary} 100%)`,
                        }}
                    >
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                                    {currentProduct.name}
                                </h2>
                                <p className="text-xl sm:text-2xl text-white/90 mb-2">{currentProduct.tagline}</p>
                                <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                    {currentProduct.description}
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-8 mb-16">
                                {/* Ingredients */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="glass p-8 rounded-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-4">Ingredients</h3>
                                    <ul className="space-y-2 text-white/90">
                                        {currentProduct.details.ingredients.map((ingredient, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-white/60" />
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Benefits */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="glass p-8 rounded-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-4">Benefits</h3>
                                    <ul className="space-y-2 text-white/90">
                                        {currentProduct.details.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="text-xl">✓</span>
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Nutrition */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center"
                                >
                                    <div className="text-6xl font-bold text-white mb-2">
                                        {currentProduct.details.nutritionHighlight.split(" ")[0]}
                                    </div>
                                    <p className="text-white/90 text-lg">
                                        {currentProduct.details.nutritionHighlight.split(" ").slice(1).join(" ")}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Buy Section */}
                    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                                    Ready to Experience?
                                </h2>
                                <p className="text-lg sm:text-xl text-white/80 mb-8">
                                    Join thousands of satisfied customers who have discovered the future of
                                    freshness.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-4 bg-gradient-to-r from-brand-orange to-brand-pink text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-brand-orange/50 transition-all"
                                    >
                                        Buy Now - {currentProduct.price}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-12 py-4 border-2 border-white/30 text-white text-xl font-bold rounded-full hover:bg-white/10 transition-all"
                                    >
                                        Learn More
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Next Flavor CTA */}
                    {currentIndex < products.length - 1 && (
                        <section
                            className="relative py-24 px-6 overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${products[currentIndex + 1].color.primary} 0%, ${products[currentIndex + 1].color.secondary} 100%)`,
                                clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)",
                            }}
                        >
                            <div className="max-w-4xl mx-auto text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <p className="text-white/80 text-lg mb-4">Up Next</p>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                                        {products[currentIndex + 1].name}
                                    </h3>
                                    <p className="text-lg sm:text-xl text-white/90 mb-8">
                                        {products[currentIndex + 1].tagline}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={nextProduct}
                                        className="px-10 py-3 bg-white text-gray-900 font-bold rounded-full hover:shadow-xl transition-all"
                                    >
                                        Explore {products[currentIndex + 1].name}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </section>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevProduct}
                    className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-all"
                    aria-label="Previous product"
                >
                    ←
                </motion.button>
            </div>

            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextProduct}
                    className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-all"
                    aria-label="Next product"
                >
                    →
                </motion.button>
            </div>

            {/* Product Selector Pills */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
                {products.map((product, index) => (
                    <motion.button
                        key={product.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => goToProduct(index)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all ${index === currentIndex
                            ? "bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-lg"
                            : "glass-dark text-white/70 hover:text-white"
                            }`}
                        aria-label={`Go to ${product.name}`}
                    >
                        {product.name.split(" ")[0]}
                    </motion.button>
                ))}
            </div>

            <Footer />
        </main>
    );
}
