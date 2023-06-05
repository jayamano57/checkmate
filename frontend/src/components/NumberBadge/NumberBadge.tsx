import styles from './styles.module.css';

interface NumberBadgeProps {
  value: number;
  theme?: 'dark' | 'light';
}

export function NumberBadge({ value, theme = 'dark' }: NumberBadgeProps) {
  return (
    <div
      className={`${styles.numberBadge} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
    >
      {value}
    </div>
  );
}
