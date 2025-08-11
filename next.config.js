// ✅ CommonJS format (works by default)
/*const nextConfig = {
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },
};

module.exports = nextConfig;*/

// ✅ CommonJS format (works by default)
const nextConfig = {
  images: {
    domains: ["oaidalleapiprodscus.blob.core.windows.net"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 🚀 increase limit to 10 MB (adjust if needed)
    },
  },
};

module.exports = nextConfig;

