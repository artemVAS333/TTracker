import { timeFormat } from '../utils/timeFormat';

interface TimerRowProps {
  timer: { id: number; title: string; description: string; time: number; isActive: boolean };
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TimerRow({ timer, onStart, onStop, onReset, onDelete }: TimerRowProps) {
  return (
    <tr className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 text-sm">{timer.title}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm">{timer.description}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm">{timeFormat(timer.time)}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm space-x-2 text-center">
        {timer.isActive ? (
          <button
            onClick={() => onStop(timer.id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => onStart(timer.id)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
          >
            Start
          </button>
        )}
        <button
          onClick={() => onReset(timer.id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition duration-200"
        >
          Reset
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
