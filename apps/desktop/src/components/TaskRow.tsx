import { timeFormat } from '../utils/timeFormat';

interface TaskRowProps {
  task: { id: number; title: string; description: string; time: number; isActive: boolean };
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskRow({ task, onStart, onStop, onReset, onDelete }: TaskRowProps) {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 text-sm">{task.title}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm">{task.description}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm">{timeFormat(task.time)}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm space-x-2 text-center">
        {task.isActive ? (
          <button
            onClick={() => onStop(task.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => onStart(task.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
          >
            Start
          </button>
        )}
        <button
          onClick={() => onReset(task.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition duration-200"
        >
          Reset
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
