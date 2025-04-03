import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function login(username: string, password: string) {
  if (username !== 'Bret' || password !== 'qwer1234') {
    throw new Error('User not exist');
  }

  return {
    id: '12345',
    access:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTc0MzY4ODgwMCwiZXhwIjoxNzQzNzMyMDAwfQ.kVsp7-7qJU5do0oQcGEWvdC36WSLVhEsVESz67eNvqw',
  };
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'ID/PW',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        try {
          const { username = '', password = '' } = credentials ?? {};
          const result = await login(username, password);

          // If no error and we have user data, return it
          return result;
        }
        catch (err) {
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
