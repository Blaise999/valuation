/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/media/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' }],
    }];
  },
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};
module.exports = nextConfig;
