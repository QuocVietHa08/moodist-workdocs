import { useTranslation } from '@/contexts/language';
import { Sounds } from '@/components/sounds';
import styles from './category.module.css';
import type { Category } from '@/data/types';
interface CategoryProps extends Category {
  functional?: boolean;
}
const descriptions: Record<string, string> = {
  nature: 'Water, wind, and the world outside.',
  rain: 'A softer soundtrack for staying in.',
  animals: 'A little company from the natural world.',
  urban: 'The familiar rhythm of a city.',
  places: 'Somewhere you can settle in.',
  transport: 'Let your thoughts take the scenic route.',
  things: 'Small, familiar sounds close to home.',
  noise: 'An even layer of sound to settle into.',
  favorites: 'The sounds you keep coming back to.',
};
export function Category({
  functional = true,
  icon,
  id,
  sounds,
  title,
}: CategoryProps) {
  const t = useTranslation();
  return (
    <div className={styles.category} data-category={id} id={`category-${id}`}>
      <div className={styles.header}>
        <div aria-hidden="true" className={styles.icon}>
          {icon}
        </div>
        <div className={styles.copy}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{t(title)}</h2>
            <span className={styles.count}>
              {t('{count} sounds', { count: sounds.length })}
            </span>
          </div>
          {descriptions[id] && (
            <p className={styles.description}>{t(descriptions[id])}</p>
          )}
        </div>
      </div>

      <Sounds functional={functional} id={id} sounds={sounds} />
    </div>
  );
}
