import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './page.module.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'CheckMate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className={styles.app}>{children}</div>
      </body>
    </html>
  );
}
