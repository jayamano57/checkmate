import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './styles.module.css';

interface ButtonWrapperProps {
  onClick: () => void;
  activeStyles?: boolean;
  className?: string;
}

export function ButtonWrapper({
  onClick,
  activeStyles = true,
  className,
  children,
  ...rest
}: PropsWithChildren<
  ButtonWrapperProps & ButtonHTMLAttributes<HTMLButtonElement>
>) {
  return (
    <button
      className={`${className} ${activeStyles ? styles.active : ''} ${
        styles.buttonWrapper
      }`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
