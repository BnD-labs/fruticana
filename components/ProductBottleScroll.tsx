"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductBottleScrollProps {
    product: Product;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const lastDrawnFrameRef = useRef<number>(-1);

    // Detect mobile once on mount
    const isMobileRef = useRef(typeof window !== "undefined" && window.innerWidth <= 768);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, product.frameCount - 1]
    );

    // Reset imagesRef when product changes
    useEffect(() => {
        imagesRef.current = new Array(product.frameCount).fill(null);
        lastDrawnFrameRef.current = -1;
    }, [product]);

    useEffect(() => {
        let isMounted = true;
        const totalFrames = product.frameCount;
        const isMobile = isMobileRef.current;
        // On mobile, load every 2nd frame to halve memory and network usage
        const frameStep = isMobile ? 2 : 1;
        setImagesLoaded(false);
        setLoadingProgress(0);

        const loadImages = async () => {
            // Phase 1: Critical frames (every ~10th frame to cover the full rotation quickly)
            const step = Math.max(1, Math.floor(totalFrames / 20));
            const criticalIndices: number[] = [];
            for (let i = 0; i < totalFrames; i += step) {
                criticalIndices.push(i);
            }
            if (criticalIndices[criticalIndices.length - 1] !== totalFrames - 1) {
                criticalIndices.push(totalFrames - 1);
            }

            let loadedCount = 0;

            const loadImage = (index: number): Promise<void> => {
                return new Promise((resolve) => {
                    const img = new Image();
                    const frameNumber = String(index + 1).padStart(3, "0");
                    img.src = `${product.folderPath}/ezgif-frame-${frameNumber}.jpg`;

                    img.onload = () => {
                        if (isMounted) {
                            imagesRef.current[index] = img;
                            loadedCount++;
                            // Percentage of critical frames for initial loader
                            if (!imagesLoaded) {
                                setLoadingProgress(Math.round((loadedCount / criticalIndices.length) * 100));
                            }
                        }
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        resolve();
                    };
                });
            };

            // Load Phase 1 (Critical)
            await Promise.all(criticalIndices.map(index => loadImage(index)));

            if (isMounted) {
                setImagesLoaded(true);
            }

            // Phase 2: Background frames (everything else)
            // On mobile, skip every other frame to reduce load
            const allIndices = Array.from({ length: totalFrames }, (_, i) => i)
                .filter(i => i % frameStep === 0);
            const remainingIndices = allIndices.filter(i => !criticalIndices.includes(i));

            const batchSize = isMobile ? 6 : 10;
            for (let i = 0; i < remainingIndices.length; i += batchSize) {
                if (!isMounted) break;
                const batch = remainingIndices.slice(i, i + batchSize);
                await Promise.all(batch.map(index => loadImage(index)));
                // Give some breathing room between batches
                await new Promise(r => setTimeout(r, isMobile ? 100 : 50));
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [product]);

    // Find the nearest loaded image to prevent black/flickering frames
    const getNearestImage = (targetIndex: number) => {
        const images = imagesRef.current;
        if (images[targetIndex]) return images[targetIndex];

        // Search outwards for the closest available frame
        let distance = 1;
        while (distance < images.length) {
            const low = targetIndex - distance;
            const high = targetIndex + distance;

            if (low >= 0 && images[low]) return images[low];
            if (high < images.length && images[high]) return images[high];

            distance++;
        }
        return null;
    };

    // Keep track of internal canvas size to avoid redundant resizing
    const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        // Cap DPR at 2 on mobile — 3× is 56% more pixels for negligible visual gain
        const rawDpr = window.devicePixelRatio || 1;
        const dpr = isMobileRef.current ? Math.min(rawDpr, 2) : rawDpr;

        if (
            canvasSizeRef.current.width !== rect.width ||
            canvasSizeRef.current.height !== rect.height ||
            canvasSizeRef.current.dpr !== dpr
        ) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + "px";
            canvas.style.height = rect.height + "px";
            canvasSizeRef.current = { width: rect.width, height: rect.height, dpr };
            // Force redraw after resize
            lastDrawnFrameRef.current = -1;
        }
    };

    // Render canvas
    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: false });
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const index = Math.round(frameIndex.get());

            // Skip the draw entirely if the frame hasn't changed — biggest perf win
            if (index === lastDrawnFrameRef.current) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const img = getNearestImage(index);

            if (img && img.complete && img.naturalWidth > 0) {
                const { width: rw, height: rh, dpr } = canvasSizeRef.current;

                ctx.save();
                ctx.scale(dpr, dpr);
                ctx.clearRect(0, 0, rw, rh);

                const imgAspect = img.width / img.height;
                const canvasAspect = rw / rh;

                let drawWidth, drawHeight, offsetX, offsetY;

                // Use "cover" fitting on mobile (≤768px) so the image
                // fills the viewport; use "contain" on desktop to letterbox.
                const isMobile = rw <= 768;
                const useCover = isMobile;

                if (useCover) {
                    // Cover: scale to fill, crop overflow (centered)
                    if (imgAspect > canvasAspect) {
                        drawHeight = rh;
                        drawWidth = rh * imgAspect;
                    } else {
                        drawWidth = rw;
                        drawHeight = rw / imgAspect;
                    }
                } else {
                    // Contain: scale to fit, letterbox (centered)
                    if (imgAspect > canvasAspect) {
                        drawWidth = rw;
                        drawHeight = rw / imgAspect;
                    } else {
                        drawHeight = rh;
                        drawWidth = rh * imgAspect;
                    }
                }

                offsetX = (rw - drawWidth) / 2;
                offsetY = (rh - drawHeight) / 2;

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                ctx.restore();
                lastDrawnFrameRef.current = index;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Initial resize check
        resizeCanvas();
        render();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [imagesLoaded, frameIndex]);

    // Handle resize with ResizeObserver for better performance
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver(() => {
            resizeCanvas();
        });

        observer.observe(canvas);
        window.addEventListener("resize", resizeCanvas);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {!imagesLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"
                    >
                        <div className="text-white text-2xl font-bold mb-4">
                            Loading Experience...
                        </div>
                        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-brand-orange to-brand-pink"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadingProgress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="text-white/70 text-sm mt-2">{loadingProgress}%</div>
                    </motion.div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%", willChange: "transform" }}
                />
            </div>
        </div>
    );
}
