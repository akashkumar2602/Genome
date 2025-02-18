const nextConfig = {
  experimental: {
    optimizeCss: true, // Enables CSS optimizations
    optimizeFonts: true, // Enables font optimizations
  },
  webpack(config: {
    optimization: {
      usedExports: boolean;
      splitChunks: {
        chunks: string;
        minSize: number; // Set minimum size for chunking (50 KB)
        maxSize: number;
      };
    };
  }) {
    // Enable tree shaking to remove unused code
    config.optimization.usedExports = true;
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 50 * 1024, // Set minimum size for chunking (50 KB)
      maxSize: 250 * 1024, // Set max size for chunking (250 KB)
    };

    return config;
  },
};

module.exports = nextConfig;
