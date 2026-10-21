import { useTranslation } from '@/contexts/language';
import { MdNotes } from 'react-icons/md/index';
import { Item } from '../item';
import { useNoteStore } from '@/stores/note';
interface NotepadProps {
  open: () => void;
}
export function Notepad({ open }: NotepadProps) {
  const t = useTranslation();
  const note = useNoteStore(state => state.note);
  return (
    <Item
      active={!!note.length}
      icon={<MdNotes />}
      label={t('Notepad')}
      shortcut="Shift + N"
      onClick={open}
    />
  );
}
