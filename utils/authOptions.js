import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    session: {
        // Set the session to use JWTs and define maxAge
        jwt: true, // Use JWT for session management
        maxAge: 17280000, // Set session duration to 7 days (in seconds)
    },
    callbacks: {
        async signIn({ profile }) {
            // 1. Connect to Database
            await connectDB();
            // 2. Check if user Exists
            const userExists = await User.findOne({ email: profile.email });
            // 3. If Not, Create user
            if (!userExists) {
                // Truncate username if too long
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
            }
            // 4. Return true to allow sign in 
            return true; // Allow sign-in by default
        },
        async session({ session }) {
            // console.log("Session callback triggered");

            const user = await User.findOne({ email: session.user.email });
            // console.log("User from DB:", user);

            if (user) {
                session.user.userId = user._id.toString();
                // console.log("Assigned userId:", session.user.userId);
            } else {
                console.error("User not found in database");
            }

            return session;
        },
    },
};

export default NextAuth(authOptions);