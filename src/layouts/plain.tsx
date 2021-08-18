import { css } from '@emotion/react';
import { FC } from 'react';
import tw from 'twin.macro';

import Logo from '../assets/bitban.svg';

/**
 * Styles
 */
const styles = {
  root: tw`max-w-xs w-full`,
  footer: tw`py-2 px-4`,
  footerLink: css`
    display: flex;
    align-items: center;

    & > svg {
      ${tw`w-4 h-4 mr-1 inline-block`}
    }
  `,
};

/**
 * Plain Layout
 */
export const PlainLayout: FC = ({ children }) => {
  return (
    <div css={styles.root}>
      <main>{children}</main>
      <footer css={styles.footer}>
        <a css={styles.footerLink} href="https://github.com/merajsahebdar/bitban-server">
          <Logo />
          BitBan
        </a>
      </footer>
    </div>
  );
};
