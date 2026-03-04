import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from './service';

const authService = new AuthService();

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;
        const user = await authService.validateCredentials(credentials.email, credentials.password);
        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.sub = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub ?? '';
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login'
  }
};

export const authHandler = NextAuth(authOptions);
