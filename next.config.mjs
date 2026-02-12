/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Commented out to enable Vercel Image Optimization and standard deployment
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
}

export default nextConfig
