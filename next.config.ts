import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
        buildActivityPosition: "bottom-right",
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
