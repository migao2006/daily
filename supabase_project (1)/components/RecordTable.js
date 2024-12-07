
export default function RecordTable({ records }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>日期</th>
          <th>讀書進度</th>
          <th>作業進度</th>
          <th>未完成事項</th>
          <th>代辦事項</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.created_date}</td>
            <td>{record.reading_progress}</td>
            <td>{record.homework_progress}</td>
            <td>{record.unfinished_tasks}</td>
            <td>{record.todo_tasks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
