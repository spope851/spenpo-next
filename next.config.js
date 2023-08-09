/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "**/**",
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/projects/two-truths",
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}
