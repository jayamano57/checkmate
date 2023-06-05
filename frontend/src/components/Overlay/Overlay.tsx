import { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export function Overlay({ children }: PropsWithChildren) {
  return <div className={styles.overlay}>{children}</div>;
}
