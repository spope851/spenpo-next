/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
