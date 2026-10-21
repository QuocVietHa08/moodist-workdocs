import { useTranslation } from '@/contexts/language';
import { FaHeadphonesAlt } from 'react-icons/fa/index';
import { Item } from '../item';
interface BinauralProps {
  open: () => void;
}
export function Binaural({ open }: BinauralProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<FaHeadphonesAlt />}
      label={t('Binaural Beats')}
      onClick={open}
    />
  );
}
