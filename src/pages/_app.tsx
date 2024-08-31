import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { AppMain } from '@/components';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <AppMain>
          <Component {...pageProps} />
        </AppMain>
      </RecoilRoot>
    </SessionProvider>
  );
}
