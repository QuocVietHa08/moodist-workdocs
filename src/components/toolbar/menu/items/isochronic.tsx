import { useTranslation } from '@/contexts/language';
import { TbWaveSine } from 'react-icons/tb/index';
import { Item } from '../item';
interface IsochronicProps {
  open: () => void;
}
export function Isochronic({ open }: IsochronicProps) {
  const t = useTranslation();
  return (
    <Item icon={<TbWaveSine />} label={t('Isochronic Tones')} onClick={open} />
  );
}
