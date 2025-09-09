// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true }, // don't fail build on ESLint
  typescript: { ignoreBuildErrors: true }, // optional: don't fail on TS errors
};

export default nextConfig;
