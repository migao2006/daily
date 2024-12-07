
import { useState } from 'react';
import { supabase } from '../utils/supabase';

export default function RecordForm() {
  const [readingProgress, setReadingProgress] = useState('');
  const [homeworkProgress, setHomeworkProgress] = useState('');
  const [unfinishedTasks, setUnfinishedTasks] = useState('');
  const [todoTasks, setTodoTasks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('reading_records')
      .insert([{ reading_progress: readingProgress, homework_progress: homeworkProgress, unfinished_tasks: unfinishedTasks, todo_tasks: todoTasks }]);
    if (error) console.error(error);
    else alert('紀錄已新增');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        讀書進度：
        <input type="text" value={readingProgress} onChange={(e) => setReadingProgress(e.target.value)} />
      </label>
      <br />
      <label>
        作業進度：
        <input type="text" value={homeworkProgress} onChange={(e) => setHomeworkProgress(e.target.value)} />
      </label>
      <br />
      <label>
        未完成事項：
        <textarea value={unfinishedTasks} onChange={(e) => setUnfinishedTasks(e.target.value)} />
      </label>
      <br />
      <label>
        代辦事項：
        <textarea value={todoTasks} onChange={(e) => setTodoTasks(e.target.value)} />
      </label>
      <br />
      <button type="submit">新增紀錄</button>
    </form>
  );
}
