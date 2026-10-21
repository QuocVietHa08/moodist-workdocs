import { useTranslation } from '@/contexts/language';
import { IoSettingsSharp } from 'react-icons/io5/index';
import { Item } from '../item';
interface SettingsProps {
  open: () => void;
}
export function Settings({ open }: SettingsProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<IoSettingsSharp />}
      label={t('Settings')}
      shortcut="Shift + G"
      onClick={open}
    />
  );
}
