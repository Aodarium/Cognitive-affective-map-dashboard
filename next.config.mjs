import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  publicRuntimeConfig: {
    DEV_URL: process.env.DEV_URL,
    PROD_URL: process.env.PROD_URL,
    URL_HOST: process.env.URL_HOST
  }
});
