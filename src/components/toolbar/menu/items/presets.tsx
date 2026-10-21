import { useTranslation } from '@/contexts/language';
import { RiPlayListFill } from 'react-icons/ri/index';
import { Item } from '../item';
interface PresetsProps {
  open: () => void;
}
export function Presets({ open }: PresetsProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<RiPlayListFill />}
      label={t('Your Presets')}
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
