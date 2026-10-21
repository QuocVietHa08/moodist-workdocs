import { sounds } from '@/data/sounds';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi/index';

import styles from './category-icons.module.css';

import { Container } from '@/components/container';
import { StarterMixes } from '@/components/starter-mixes/starter-mixes';
import { OPEN_SOUND_SEARCH } from '@/constants/events';
import { dispatch } from '@/lib/event';

export default function CategoryIcons() {
  const categories = useMemo(() => sounds.categories, []);
  const goto = (id: string) => {
    const category = document.getElementById(`category-${id}`);
    category?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Find your sound.</h2>
            <p>Choose a mix, or layer your own sounds.</p>
          </div>
          <button
            aria-label="Search sounds"
            className={styles.searchButton}
            type="button"
            onClick={() => dispatch(OPEN_SOUND_SEARCH)}
          >
            <BiSearch aria-hidden="true" />
            Search<span className={styles.searchSuffix}> sounds</span>
          </button>
        </div>

        <StarterMixes />
        <nav aria-label="Sound categories" className={styles.categories}>
          {categories.map(category => (
            <button
              aria-description={`${category.sounds.length} sounds`}
              aria-label={category.title}
              className={styles.category}
              data-category={category.id}
              key={category.id}
              onClick={() => goto(category.id)}
              type="button"
            >
              <span aria-hidden="true" className={styles.icon}>
                {category.icon}
              </span>
              <span className={styles.name}>{category.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </Container>
  );
}
