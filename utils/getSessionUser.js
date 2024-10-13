// utils/getSessionUser.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export async function getSessionUser() {
    const session = await getServerSession(authOptions);
    // console.log('Session:', session); // Log session to verify its structure

    if (!session || !session.user) {
        // console.error('No valid session or user found.'); // Log the error
        return null; // Ensure this returns null
    }

    const userId = session.user.userId; // Ensure this matches your session structure
    // console.log('User ID:', userId); // Print userId

    return {
        user: session.user,
        userId: userId,
    };
}
