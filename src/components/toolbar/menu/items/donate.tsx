import { useTranslation } from '@/contexts/language';
import { SiBuymeacoffee } from 'react-icons/si/index';
import { Item } from '../item';
export function Donate() {
  const t = useTranslation();
  return (
    <Item
      href="https://buymeacoffee.com/remvze"
      icon={<SiBuymeacoffee />}
      label={t('Buy Me a Coffee')}
    />
  );
}
