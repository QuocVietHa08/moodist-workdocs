import { useTranslation } from '@/contexts/language';
import { useState } from 'react';
import { useTodoStore } from '@/stores/todo';
import styles from './form.module.css';
export function Form() {
  const t = useTranslation();
  const [value, setValue] = useState('');
  const addTodo = useTodoStore(state => state.addTodo);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = value.trim();
    if (!task) return;
    addTodo(task);
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          aria-label={t('New task')}
          placeholder={t('Add a task')}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button disabled={!value.trim()} type="submit">
          {t('Add')}
        </button>
      </div>
    </form>
  );
}
