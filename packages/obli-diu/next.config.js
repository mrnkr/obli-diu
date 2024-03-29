const path = require('path');
const withTM = require('next-transpile-modules')(['shared']);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '..',
      '..',
      'node_modules',
      'react',
    );

    return config;
  },
});
