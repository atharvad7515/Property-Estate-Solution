// Import the necessary modules
import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

// Create the NextAuth handler with your authentication options
const handler = NextAuth(authOptions);
console.log(process.env.GOOGLE_CLIENT_ID);

// Export named functions for GET and POST methods
export { handler as GET, handler as POST };
