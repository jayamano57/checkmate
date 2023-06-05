import { CSSProperties } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.css';
import { InputHTMLAttributes } from 'react';

interface TextInputProps {
  label?: string;
  labelAlign?: 'left' | 'center' | 'right';
  rightSection?: JSX.Element;
  styles?: CSSProperties;
  labelStyles?: CSSProperties;
}

export function TextInput({
  label,
  labelAlign,
  rightSection,
  styles: customStyles,
  labelStyles: customLabelStyles,
  ...rest
}: TextInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = uuid();
  return (
    <div className={styles.textInputWrapper}>
      <label
        htmlFor={inputId}
        className={styles.label}
        style={{
          fontSize: '16px',
          textAlign: labelAlign ?? 'center',
          ...customLabelStyles,
        }}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type="text"
          className={styles.input}
          style={customStyles}
          {...rest}
        />
        {rightSection && (
          <div className={styles.rightSectionWrapper}>{rightSection}</div>
        )}
      </div>
    </div>
  );
}
