import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        position: "bottom-right",
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    }
};

export default nextConfig;
