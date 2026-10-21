import { useTranslation } from '@/contexts/language';
import { IoShareSocialSharp } from 'react-icons/io5/index';
import { Item } from '../item';
import { useSoundStore } from '@/stores/sound';
interface ShareProps {
  open: () => void;
}
export function Share({ open }: ShareProps) {
  const t = useTranslation();
  const noSelected = useSoundStore(state => state.noSelected());
  return (
    <Item
      disabled={noSelected}
      icon={<IoShareSocialSharp />}
      label={t('Share Sounds')}
      shortcut="Shift + S"
      onClick={open}
    />
  );
}
