const AWS_S3_BUCKET_BASE_URL = process.env.AWS_S3_BUCKET_BASE_URL.replace('https://', '').replace('http://', '');
console.log('AWS_S3_BUCKET_BASE_URL', AWS_S3_BUCKET_BASE_URL);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: AWS_S3_BUCKET_BASE_URL,
        port: '',
      },
    ],
  },
};
export default nextConfig;