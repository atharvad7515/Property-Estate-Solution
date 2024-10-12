/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**', // Allow any path
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Allow Cloudinary domain
                pathname: '**', // Allow any path
            },
        ],
    },
};

export default nextConfig;
