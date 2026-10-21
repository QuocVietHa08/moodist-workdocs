import { useTranslation } from '@/contexts/language';
import { MdKeyboardCommandKey } from 'react-icons/md/index';
import { Item } from '../item';
interface ShortcutsProps {
  open: () => void;
}
export function Shortcuts({ open }: ShortcutsProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<MdKeyboardCommandKey />}
      label={t('Shortcuts')}
      shortcut="Shift + H"
      onClick={open}
    />
  );
}
