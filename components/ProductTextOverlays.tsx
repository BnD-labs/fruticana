"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductTextOverlaysProps {
    product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Create transforms for each section
    const section1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
    const section1Y = useTransform(scrollYProgress, [0, 0.15, 0.25], [50, 0, -50]);

    const section2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [50, 0, -50]);

    const section3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const section3Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

    const section4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 0]);
    const section4Y = useTransform(scrollYProgress, [0.75, 0.85, 1], [50, 0, -50]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: section1Opacity, y: section1Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <h2
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl"
                    style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
                >
                    {product.sections.section1}
                </h2>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: section2Opacity, y: section2Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <h2
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl"
                    style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
                >
                    {product.sections.section2}
                </h2>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: section3Opacity, y: section3Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <h2
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl"
                    style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
                >
                    {product.sections.section3}
                </h2>
            </motion.div>

            {/* Section 4 */}
            <motion.div
                style={{ opacity: section4Opacity, y: section4Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <h2
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl"
                    style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
                >
                    {product.sections.section4}
                </h2>
            </motion.div>
        </div>
    );
}
