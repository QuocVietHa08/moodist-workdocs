import { useTranslation } from '@/contexts/language';
import { Modal, ModalHeader, ModalTitle } from '@/components/modal';
import { Exercise } from './exercise';
interface TimerProps {
  onClose: () => void;
  show: boolean;
}
export function BreathingExerciseModal({ onClose, show }: TimerProps) {
  const t = useTranslation();
  return (
    <Modal docked show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{t('Breathing Exercise')}</ModalTitle>
      </ModalHeader>
      <Exercise />
    </Modal>
  );
}
