import { useTranslation } from '@/contexts/language';
import { LuRadioTower } from 'react-icons/lu/index';
import { Item } from '../item';
interface RadioProps {
  active: boolean;
  open: () => void;
}
export function Radio({ active, open }: RadioProps) {
  const t = useTranslation();
  return (
    <Item
      active={active}
      icon={<LuRadioTower />}
      label={t('Music Radio')}
      onClick={open}
    />
  );
}
