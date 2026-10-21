import { BiCoffee, BiHeadphone, BiMoon, BiPlay } from 'react-icons/bi/index';

import { useSoundStore } from '@/stores/sound';
import { OPEN_PRESETS } from '@/constants/events';
import { dispatch } from '@/lib/event';
import { findStarterMix, starterMixes } from '@/lib/starter-mixes';

import styles from './starter-mixes.module.css';

const icons = [BiHeadphone, BiCoffee, BiMoon];

export function StarterMixes() {
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);
  const locked = useSoundStore(state => state.locked);
  const active = useSoundStore(state => findStarterMix(state.sounds)?.id);

  const playMix = (sounds: Record<string, number>) => {
    if (locked) return;
    override(sounds, true);
    play();
  };

  return (
    <section aria-labelledby="starter-mixes-title" className={styles.wrapper}>
      <div className={styles.heading}>
        <h3 id="starter-mixes-title">Start with a mix</h3>
        <button onClick={() => dispatch(OPEN_PRESETS)} type="button">
          Your saved mixes
        </button>
      </div>
      <div className={styles.mixes}>
        {starterMixes.map((mix, index) => {
          const Icon = icons[index];
          return (
            <button
              aria-label={`Play ${mix.name} mix`}
              aria-pressed={active === mix.id}
              className={styles.mix}
              data-scene={mix.id}
              disabled={locked}
              key={mix.id}
              onClick={() => playMix(mix.sounds)}
              type="button"
            >
              <span aria-hidden="true" className={styles.scene}>
                <Icon />
              </span>
              <span className={styles.text}>
                <strong>{mix.name}</strong>
                <span>{mix.description}</span>
              </span>
              <BiPlay aria-hidden="true" className={styles.play} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
