/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.unitec.co.mz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.unitec.ac.mz',
        port: '',
        pathname: '/**',
      },
    ],
  },
      webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        if (config.cache && !dev) {
          config.cache = Object.freeze({
            type: 'memory',
          })
        }
        // Important: return the modified config
        return config
      },

      async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Cache-Control', value: 'public, max-age=600, stale-while-revalidate=60' },
            ],
          },
        ];
      },
    
};


export default nextConfig;
