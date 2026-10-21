import { useTranslation } from '@/contexts/language';
import { BiTrash } from 'react-icons/bi/index';
import { LuCopy, LuDownload } from 'react-icons/lu/index';
import { FaCheck } from 'react-icons/fa6/index';
import { FaUndo } from 'react-icons/fa/index';
import { Modal, ModalHeader, ModalTitle } from '@/components/modal';
import { Button } from './button';
import { useNoteStore } from '@/stores/note';
import { useCopy } from '@/hooks/use-copy';
import { download } from '@/helpers/download';
import styles from './notepad.module.css';
import { Tooltip } from '@/components/tooltip';
interface NotepadProps {
  onClose: () => void;
  show: boolean;
}
export function Notepad({ onClose, show }: NotepadProps) {
  const t = useTranslation();
  const note = useNoteStore(state => state.note);
  const history = useNoteStore(state => state.history);
  const write = useNoteStore(state => state.write);
  const words = useNoteStore(state => state.words());
  const characters = useNoteStore(state => state.characters());
  const clear = useNoteStore(state => state.clear);
  const restore = useNoteStore(state => state.restore);
  const { copy, copying } = useCopy();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Escape') onClose();
  };
  return (
    <Modal docked show={show} wide onClose={onClose}>
      <ModalHeader className={styles.header}>
        <ModalTitle className={styles.label}>{t('Your note')}</ModalTitle>
        <div className={styles.buttons}>
          <Tooltip.Provider delayDuration={0}>
            <Button
              icon={copying ? <FaCheck /> : <LuCopy />}
              tooltip={copying ? t('Copied') : t('Copy note')}
              onClick={() => copy(note)}
            />
            <Button
              icon={<LuDownload />}
              tooltip={t('Download note')}
              onClick={() => download('Focus note.txt', note)}
            />
            <Button
              critical={!history}
              icon={history ? <FaUndo /> : <BiTrash />}
              recommended={!!history}
              tooltip={history ? t('Restore note') : t('Clear note')}
              onClick={() => (history ? restore() : clear())}
            />
          </Tooltip.Provider>
        </div>
      </ModalHeader>

      <textarea
        aria-label={t('Your note')}
        className={styles.textarea}
        dir="auto"
        placeholder={t('What is on your mind?')}
        spellCheck={false}
        value={note}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <p className={styles.counter}>
        <span>{t('Saved in this browser')}</span>
        <span>
          {characters} {t(characters === 1 ? 'character' : 'characters')} ·{' '}
          {words} {t(words === 1 ? 'word' : 'words')}
        </span>
      </p>
    </Modal>
  );
}
