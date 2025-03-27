/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CREDENTIALS: process.env.GOOGLE_CREDENTIALS,
    CALENDAR_ID: process.env.CALENDAR_ID,
  },
}

module.exports = nextConfig 