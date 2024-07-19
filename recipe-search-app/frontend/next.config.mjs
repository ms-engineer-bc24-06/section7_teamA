/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  },
};

export default nextConfig;
