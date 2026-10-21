import { createContext, useContext } from 'react';
import { cn } from '@/helpers/styles';

import styles from './modal.module.css';

export const ModalTitleContext = createContext<string | undefined>(undefined);

export function ModalHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'header'>) {
  return <header className={cn(styles.header, className)} {...props} />;
}

export function ModalTitle({
  className,
  id,
  ...props
}: React.ComponentPropsWithoutRef<'h2'>) {
  const titleId = useContext(ModalTitleContext);
  return (
    <h2 className={cn(styles.title, className)} id={id || titleId} {...props} />
  );
}

export function ModalDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function ModalActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn(styles.actions, className)} {...props} />;
}

interface ModalButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  fullWidth?: boolean;
  variant?: 'default' | 'primary';
}

export function ModalButton({
  className,
  fullWidth,
  variant = 'default',
  ...props
}: ModalButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    />
  );
}
