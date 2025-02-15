import TaskRow from './TaskRow';

interface TaskListProps {
  tasks: { id: number; title: string; description: string; time: number; isActive: boolean }[];
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onStart, onStop, onReset, onDelete }: TaskListProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{tasks[0].isActive ? 'Active Tasks' : 'Inactive Tasks'}</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">Time</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onStart={onStart}
              onStop={onStop}
              onReset={onReset}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
