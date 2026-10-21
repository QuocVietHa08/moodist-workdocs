import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoClose } from 'react-icons/io5/index';
import FocusTrap from 'focus-trap-react';

import { Portal } from '@/components/portal';

import { fade, mix, slideY } from '@/lib/motion';
import { cn } from '@/helpers/styles';
import { ModalTitleContext } from './elements';

import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  docked?: boolean;
  closeOnEscape?: boolean;
  lockBody?: boolean;
  onClose: () => void;
  persist?: boolean;
  portalContainerRef?: React.Ref<HTMLDivElement>;
  show: boolean;
  wide?: boolean;
}

const TRANSITION_DURATION = 300;

function DockedPanel({
  children,
  onClose,
  titleId,
}: {
  children: React.ReactNode;
  onClose: () => void;
  titleId: string;
}) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const trigger = document.querySelector<HTMLElement>(
      '[aria-controls="focus-tool-panel"][aria-expanded="true"]',
    );
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const frame = requestAnimationFrame(() => {
      const input = panel.querySelector<HTMLElement>(
        'textarea, input[type="text"]:not(:disabled)',
      );
      (input || panel).focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      if (
        panel.contains(document.activeElement) ||
        document.activeElement === document.body
      ) {
        const target = trigger?.isConnected ? trigger : previousFocus;
        if (target?.isConnected) target.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <section
      aria-labelledby={titleId}
      className={styles.docked}
      id="focus-tool-panel"
      ref={panelRef}
      tabIndex={-1}
    >
      <button
        aria-label="Minimize tool"
        className={styles.minimize}
        onClick={onClose}
        type="button"
      >
        <IoClose aria-hidden="true" />
      </button>
      {children}
    </section>
  );
}

export function Modal({
  children,
  docked = false,
  closeOnEscape = true,
  lockBody = true,
  onClose,
  persist = false,
  portalContainerRef,
  show,
  wide,
}: ModalProps) {
  const titleId = useId();
  const labelledChildren = (
    <ModalTitleContext.Provider value={titleId}>
      {children}
    </ModalTitleContext.Provider>
  );
  const variants = {
    modal: mix(fade(), slideY(20)),
    overlay: fade(),
  };

  useEffect(() => {
    if (!show || !lockBody || docked) return;

    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, [show, lockBody, docked]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (show && closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  }, [closeOnEscape, onClose, show]);

  const animationProps = persist
    ? {
        animate: show ? 'show' : 'hidden',
      }
    : {
        animate: 'show',
        exit: 'hidden',
        initial: 'hidden',
      };

  if (docked) {
    return show ? (
      <Portal>
        <DockedPanel titleId={titleId} onClose={onClose}>
          {labelledChildren}
        </DockedPanel>
      </Portal>
    ) : null;
  }

  const content = (
    <FocusTrap active={show}>
      <div>
        <motion.div
          {...animationProps}
          className={styles.overlay}
          transition={{ duration: TRANSITION_DURATION / 1000 }}
          variants={variants.overlay}
          onClick={onClose}
          onKeyDown={onClose}
        />
        <div className={styles.modal}>
          <motion.div
            {...animationProps}
            aria-labelledby={titleId}
            aria-modal="true"
            className={cn(styles.content, wide && styles.wide)}
            role="dialog"
            transition={{ duration: TRANSITION_DURATION / 1000 }}
            variants={variants.modal}
          >
            <button
              aria-label="Close dialog"
              className={styles.close}
              onClick={onClose}
            >
              <IoClose />
            </button>
            {labelledChildren}
          </motion.div>
        </div>
        {portalContainerRef && <div ref={portalContainerRef} />}
      </div>
    </FocusTrap>
  );

  return (
    <Portal>
      {persist ? (
        <div style={{ display: show ? 'block' : 'none' }}>{content}</div>
      ) : (
        <AnimatePresence>{show && content}</AnimatePresence>
      )}
    </Portal>
  );
}
