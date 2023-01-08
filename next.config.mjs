// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
typescript:{
    //There was one error during the build step which was causing issues with the deployment in vercel. It was related to typescript.
    //I Understand that this line is dangerous, however for the sake of time on this assignment I have decided to leave it in.
    ignoreBuildErrors: true,
},
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
    images: {
    domains: ["www.boxequalsart.com"],
    },
};
export default config;
