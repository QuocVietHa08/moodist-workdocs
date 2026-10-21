import { useTranslation } from '@/contexts/language';
import { MdOutlineTimer } from 'react-icons/md/index';
import { Item } from '../item';
interface CountdownProps {
  open: () => void;
}
export function Countdown({ open }: CountdownProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<MdOutlineTimer />}
      label={t('Countdown Timer')}
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
