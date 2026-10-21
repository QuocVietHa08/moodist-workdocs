import { useTranslation } from '@/contexts/language';
import { LuGithub } from 'react-icons/lu/index';
import { Item } from '../item';
export function Source() {
  const t = useTranslation();
  return (
    <Item
      href="https://github.com/QuocVietHa08/moodist-workdocs"
      icon={<LuGithub />}
      label={t('Source Code')}
    />
  );
}
