import { LuGithub } from 'react-icons/lu/index';

import { Item } from '../item';

export function Source() {
  return (
    <Item
      href="https://github.com/QuocVietHa08/moodist-workdocs"
      icon={<LuGithub />}
      label="Source Code"
    />
  );
}
