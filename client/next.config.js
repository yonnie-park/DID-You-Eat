/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PINATA_API_KEY: "55f917a2246ed620457a",
    PINATA_API_SECRET: "dd0b5eb9251e9307fcd94cc61f83b86778beb856189e6a0a28b10e7ad011e1b1",
    PINATA_JWT:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNDQwYjlkNy04YjJlLTQwNGUtYTdmNS05NDUyNTg5YTA3ZTIiLCJlbWFpbCI6Indsc25xc2xla0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTVmOTE3YTIyNDZlZDYyMDQ1N2EiLCJzY29wZWRLZXlTZWNyZXQiOiJkZDBiNWViOTI1MWU5MzA3ZmNkOTRjYzYxZjgzYjg2Nzc4YmViODU2MTg5ZTZhMGEyOGIxMGU3YWQwMTFlMWIxIiwiaWF0IjoxNjc0ODExNTg3fQ.LZ-npC18n2pZGJNGEOEqLt6DlUG38OWNM4aGlB6ksnM",
    // SERVER_URL: "http://ec2-54-236-26-96.compute-1.amazonaws.com/api",
    SERVER_URL: "http://ec2-54-236-26-96.compute-1.amazonaws.com/",
    CLIENT_URL: "http://localhost:3000",
    APTOS_CLIENT: "https://fullnode.testnet.aptoslabs.com",

    // CLIENT_URL: "http://localhost:3000",
    // SERVER_URL: "http://172.20.10.12:3000",
  },

  images: {
    loader: "custom",
    loaderFile: "./src/utils/imgLoader.js",
    // domains: ['http://didyoueeat.s3-website.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
