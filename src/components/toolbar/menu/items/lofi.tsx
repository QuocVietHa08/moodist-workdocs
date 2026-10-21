import { useTranslation } from '@/contexts/language';
import { IoIosMusicalNote } from 'react-icons/io/index';
import { Item } from '../item';
interface LofiProps {
  open: () => void;
}
export function Lofi({ open }: LofiProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<IoIosMusicalNote />}
      label={t('Lofi Music Player')}
      onClick={open}
    />
  );
}
