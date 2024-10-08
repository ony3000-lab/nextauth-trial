import { useSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { Button } from 'tailwind-joy/components';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Next Tailwind Template</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div
        className="flex min-h-screen flex-col gap-8 px-5 py-8 sm:gap-16 sm:px-12
          sm:py-16 lg:gap-24 lg:px-20 lg:py-24"
      >
        {session ? (
          <>
            Signed in as {session.user.username} <br />
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            Not signed in <br />
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
      </div>
    </>
  );
}
