/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: "/admin", destination: "/keystatic", permanent: false }];
  },
};

export default nextConfig;
