/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    compiler:{
      styledComponents: true
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
        ],
      },
}

module.exports = nextConfig
