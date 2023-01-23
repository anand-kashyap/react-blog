import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
};

function variantToClass(variant: string) {
  return variant === 'primary' ? '' : variant;
}

export function Button({ variant = 'primary', children, ...buttonProps }: BtnProps) {
  return (
    <button {...buttonProps} className={cx(styles.button, variantToClass(variant))}>
      <span>{children}</span>
    </button>
  );
}
