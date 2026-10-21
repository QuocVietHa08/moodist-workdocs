import { useTranslation } from '@/contexts/language';
import { MdTaskAlt } from 'react-icons/md/index';
import { Item } from '../item';
interface TodoProps {
  open: () => void;
}
export function Todo({ open }: TodoProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<MdTaskAlt />}
      label={t('Todo Checklist')}
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
