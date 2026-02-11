"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen
                ? "glass-dark border-b border-white/10"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 relative z-50">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                    >
                        <path
                            d="M20 5 L30 15 L25 25 L20 35 L15 25 L10 15 Z"
                            fill="url(#gradient1)"
                        />
                        <circle cx="20" cy="15" r="5" fill="#feca57" opacity="0.8" />
                        <defs>
                            <linearGradient
                                id="gradient1"
                                x1="10"
                                y1="5"
                                x2="30"
                                y2="35"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stopColor="#ff6b35" />
                                <stop offset="50%" stopColor="#f72585" />
                                <stop offset="100%" stopColor="#7209b7" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h1 className="text-2xl font-bold text-gradient">Fruticana</h1>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-white/90">
                    <a href="#products" className="hover:text-white transition-colors">
                        Products
                    </a>
                    <a href="#benefits" className="hover:text-white transition-colors">
                        Benefits
                    </a>
                    <a href="#about" className="hover:text-white transition-colors">
                        About
                    </a>
                </div>

                {/* CTA Button & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-pink text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-orange/50 transition-all duration-300"
                    >
                        Order Now
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col items-end gap-1.5">
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-white block origin-center transition-transform"
                            />
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-4 h-0.5 bg-white block transition-opacity"
                            />
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "66%" }}
                                className="h-0.5 bg-white block origin-center transition-transform"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                    open: {
                        opacity: 1,
                        pointerEvents: "auto",
                        transition: { duration: 0.2 }
                    },
                    closed: {
                        opacity: 0,
                        pointerEvents: "none",
                        transition: { duration: 0.2, delay: 0.1 }
                    }
                }}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center"
            >
                <motion.div
                    variants={{
                        open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                    }}
                    className="flex flex-col items-center gap-8"
                >
                    {["Products", "Benefits", "About"].map((item) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            variants={{
                                open: { y: 0, opacity: 1 },
                                closed: { y: 20, opacity: 0 }
                            }}
                            className="text-3xl font-bold text-white hover:text-brand-orange transition-colors"
                        >
                            {item}
                        </motion.a>
                    ))}
                    <motion.button
                        variants={{
                            open: { y: 0, opacity: 1 },
                            closed: { y: 20, opacity: 0 }
                        }}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-brand-orange to-brand-pink text-white text-xl font-bold rounded-full"
                    >
                        Order Now
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}
