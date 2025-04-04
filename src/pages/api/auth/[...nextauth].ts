import jwt from 'jsonwebtoken';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const secret = 'my-256-bit-secret';
const expiresInSeconds = 300;

async function login(username: string, password: string) {
  if (username !== 'Bret' || password !== 'qwer1234') {
    throw new Error('User not exist');
  }

  const token = jwt.sign(
    {
      name: 'John Doe',
    },
    secret,
    {
      expiresIn: `${expiresInSeconds}s`,
    },
  );

  return {
    id: '12345',
    access: token,
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
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // 로그인할 때, 또는 클라이언트에서 세션에 접근할 때마다 호출된다.
      // `token`을 제외한 나머지 파라미터는 이 콜백이 처음 호출될 때(=로그인할 때)만 존재할 수 있으며, 이후 호출에서는 `token`만 존재한다.
      // 따라서 파라미터에 저장된 데이터를 유지하고 싶은 경우, 첫 번째 호출에서 `token`에 데이터를 추가해야 한다.

      if (user) {
        /* eslint-disable no-param-reassign */

        // 여기에서 `user`는 `CredentialsProvider`의 `authorize`에서 반환한 값이다.

        // @ts-expect-error
        token.access = user.access;

        /* eslint-enable no-param-reassign */
      }

      return token;
    },
    async session({ session, user, token }) {
      // 세션을 검사할 때마다 호출된다.
      // `jwt` 콜백에서 `token`에 추가한 데이터를 클라이언트에서 사용할 수 있게 하려면, 이 콜백에서 `session`에 데이터를 추가해야 한다.

      /* eslint-disable no-param-reassign */

      // 여기에서 `token`은 `jwt` 콜백(두 번째 호출부터)에서 반환한 값이다.

      // @ts-expect-error
      session.access = token.access;

      /* eslint-enable no-param-reassign */

      return session;
    },
  },
};

export default NextAuth(authOptions);
