import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import styles from './styles.module.css';

interface ButtonProps {
  color?: 'black' | 'white';
  onClick: () => void;
  circle?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  styles?: CSSProperties;
}

export function Button({
  color = 'black',
  onClick,
  circle,
  fullWidth,
  disabled,
  styles: customStyles,
  children,
}: PropsWithChildren<ButtonProps>) {
  const baseStyles = useMemo(() => {
    return {
      border: 'none',
      borderRadius: circle ? '50%' : '4px',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? '0.5' : 1,
    };
  }, [circle, disabled, fullWidth]);

  const colorStyles = useMemo(() => {
    if (color === 'black') {
      return {
        backgroundColor: 'var(--main-dark)',
        color: 'var(--main-light)',
      };
    }

    if (color === 'white') {
      return {
        backgroundColor: 'var(--main-light)',
        color: 'var(--main-dark)',
      };
    }
  }, [color]);

  return (
    <button
      className={styles.button}
      style={{ ...baseStyles, ...colorStyles, ...customStyles }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
