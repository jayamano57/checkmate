import { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { v4 as uuid } from 'uuid';

interface CheckEditableAmountInputProps {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | null;
}

export function CheckEditableAmountInput({
  label,
  value,
  onChange,
}: CheckEditableAmountInputProps) {
  const inputId = uuid();
  return (
    <div className={`${styles.mainInputContainer} ${styles.tax}`}>
      <label htmlFor={inputId} className={styles.label}>
        {label}:
      </label>
      <div className={styles.inputContainer}>
        <span className={styles.dollarSign}>$</span>
        <input
          id={inputId}
          type="number"
          className={styles.input}
          value={value ?? ''}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
