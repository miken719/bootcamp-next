/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  compress: true,
  async redirects() {
    return [
      {
        source: "https://bootcamp-next.vercel.app",
        destination: "https://bootcamp-navigator.vercel.app/",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};
module.exports = nextConfig;
