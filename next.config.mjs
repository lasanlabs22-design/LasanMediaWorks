/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // The Studio Console is a static page in /public that talks to /api/admin/*
  async rewrites() {
    return [{ source: '/admin', destination: '/admin.html' }];
  },
  async headers() {
    return [
      { source: '/admin.html', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/video/:file*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
    ];
  },
};

export default nextConfig;
