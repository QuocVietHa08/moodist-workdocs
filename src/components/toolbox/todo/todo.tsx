import {
  Modal,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  return (
    <Modal docked show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>To-do list</ModalTitle>
          <ModalDescription>
            One next step. Saved in this browser.
          </ModalDescription>
        </div>
      </ModalHeader>

      <Form />
      <Todos />
    </Modal>
  );
}
