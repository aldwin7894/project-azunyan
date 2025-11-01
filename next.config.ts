import { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
    ],
  },
};

module.exports = nextConfig;
