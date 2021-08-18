import Head from 'next/head';

import { SignIn } from '../../features/auth';
import { BitBanPage } from '../../interfaces';
import { PlainLayout } from '../../layouts';

/**
 * Sign In Page
 */
export const SignInPage: BitBanPage = () => {
  return (
    <PlainLayout>
      <Head>
        <title>BitBan &mdash; Sign In</title>
      </Head>
      <SignIn />
    </PlainLayout>
  );
};

// Default Export
export default SignInPage;
