import { PropsWithChildren } from 'react';
import styles from './styles.module.css';
import Skeleton from 'react-loading-skeleton';

export function LoadingSkeleton() {
  return (
    <div className={`container ${styles.alignContainer}`}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          <Skeleton height={48} />
        </h1>
        <h2>
          <Skeleton height={20} count={3} />
        </h2>
      </div>
      <div className={styles.body}>
        <Skeleton height={'100%'} />
      </div>
      <div className={styles.footer}>
        <Skeleton height={50} />
      </div>
    </div>
  );
}
