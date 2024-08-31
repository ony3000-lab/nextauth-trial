import { useSession } from 'next-auth/react';
import type { ComponentProps } from 'react';

import { classNames } from '@/adaptors';
import { pretendard } from '@/fonts';

export default function AppMain({ children }: ComponentProps<'main'>) {
  const { status } = useSession();

  if (status === 'loading') {
    return null;
  }

  return (
    <main className={classNames(pretendard.variable, 'font-sans')}>
      {children}
    </main>
  );
}
