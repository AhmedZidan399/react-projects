/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkbkvnflkagvrnoriggr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;

//   output: "export", // Outputs a Single-Page Application (SPA)
//   distDir: "dist", // Changes the build output directory to `build`
//   images: {
//     loader: "custom",
//     loaderFile: "./my-loader.js",
//   },
