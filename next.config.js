/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    );
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },

  images: {
    domains: ['i.pravatar.cc', 'coffins-direct.co.uk', 'bellacouche.com',
      'res.cloudinary.com',
      'milanomonuments.com',
      'www.musgrovewillowscoffins.co.uk',
      'ffma.co.uk',
      'perfectmemorials.com',
      'iccm-mosaics.org'
    ]
  }
}

const withTM = require("next-transpile-modules")([
  'gsap',
  'hover-effect'
]);

module.exports = withTM();
module.exports = nextConfig
