/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true, // you can keep this
        // ppr: "incremental", // removed for stable Next.js
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
