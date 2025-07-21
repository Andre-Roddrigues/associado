
import { nextAuthOptions } from '@/lib/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
// export {nextAuthOptions};
