import { Menu } from './menu';
import { ScrollToTop } from './scroll-to-top';
import { StarterMixes } from '@/components/starter-mixes/starter-mixes';

import styles from './toolbar.module.css';

export function Toolbar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ScrollToTop />
        <div className={styles.actions}>
          <StarterMixes />
          <Menu />
        </div>
      </div>
    </div>
  );
}
