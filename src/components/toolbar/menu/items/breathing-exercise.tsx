import { useTranslation } from '@/contexts/language';
import { IoMdFlower } from 'react-icons/io/index';
import { Item } from '../item';
interface BreathingExerciseProps {
  open: () => void;
}
export function BreathingExercise({ open }: BreathingExerciseProps) {
  const t = useTranslation();
  return (
    <Item
      icon={<IoMdFlower />}
      label={t('Breathing Exercise')}
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
