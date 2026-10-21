import { useTranslation } from '@/contexts/language';
import { Modal, ModalHeader, ModalTitle } from '@/components/modal';
import { New } from './new';
import { List } from './list';
import styles from './presets.module.css';
interface PresetsModalProps {
  onClose: () => void;
  show: boolean;
}
export function PresetsModal({ onClose, show }: PresetsModalProps) {
  const t = useTranslation();
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{t('Your mixes')}</ModalTitle>
      </ModalHeader>
      <New onSaved={onClose} />
      <div className={styles.divider} />
      <List close={onClose} />
    </Modal>
  );
}
