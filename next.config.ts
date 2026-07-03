// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const localIp = process.env.LOCAL_IP_ADDRESS?.trim();
const devPort = process.env.PORT?.trim() || "3000";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  serverExternalPackages: [],
  images: {
    unoptimized: true,
  },
  env: {
    LOCAL_IP_ADDRESS: localIp || "",
  },
  allowedDevOrigins: localIp && !isProd ? [`http://${localIp}:${devPort}`] : [],
};

export default nextConfig;
