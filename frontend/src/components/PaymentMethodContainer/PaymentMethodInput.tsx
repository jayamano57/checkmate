import { ChangeEvent, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export type PaymentProvider = 'venmo' | 'zelle';

interface PaymentMethodContainerProps {
  type: PaymentProvider;
}

export function PaymentMethodContainer({
  type,
  children,
}: PropsWithChildren<PaymentMethodContainerProps>) {
  return (
    <div
      className={styles.paymentMethodContainer}
      style={{
        backgroundColor: type === 'venmo' ? 'var(--venmo)' : 'var(--zelle)',
      }}
    >
      <label className={styles.label}>
        {type === 'venmo' ? 'Venmo' : 'Zelle'}
      </label>
      {children}
    </div>
  );
}
