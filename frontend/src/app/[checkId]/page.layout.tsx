import { PropsWithChildren } from 'react';
import styles from './styles.module.css';

interface Alert {
  message: string;
  title?: string;
  type: 'success' | 'error' | 'info';
}

interface CheckPageLayoutProps {
  title: string;
  subtitle?: string | JSX.Element;
  alert?: Alert;
  primaryAction: JSX.Element;
}

export default function CheckPageLayout({
  title,
  subtitle,
  alert,
  primaryAction,
  children,
}: PropsWithChildren<CheckPageLayoutProps>) {
  return (
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <h1 className={styles.header}>{title}</h1>
        <h2 className={styles.subheader}>
          {alert && (
            <div
              className={`${styles.alertBox} ${
                alert.type === 'success' ? styles.success : ''
              } ${alert.type === 'error' ? styles.error : ''} ${
                alert.type === 'info' ? styles.info : ''
              }`}
            >
              {alert.title && (
                <div className={styles.alertBoxLabel}>{alert.title}</div>
              )}
              <div>{alert.message}</div>
            </div>
          )}
          {subtitle}
        </h2>
      </div>
      <div className={styles.contentBody}>{children}</div>
      {primaryAction && primaryAction}
    </div>
  );
}
