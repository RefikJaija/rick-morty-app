/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'antd'
  ],
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig