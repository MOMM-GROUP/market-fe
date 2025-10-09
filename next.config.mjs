/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    //  localPatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'placehold.co', // Example for a remote placeholder service
    //   },
    //   {
    //     // This pattern allows query strings for the specific local image
    //     // that is causing the warning.
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '3000',
    //     pathname: '/placeholder.svg',
    //   },
    // ],
  },
}

export default nextConfig
