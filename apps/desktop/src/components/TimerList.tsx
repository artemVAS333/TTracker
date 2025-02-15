import TimerRow from './TimerRow';

interface TimerListProps {
  timers: { id: number; title: string; description: string; time: number; isActive: boolean }[];
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TimerList({ timers, onStart, onStop, onReset, onDelete }: TimerListProps) {
  if (timers.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{timers[0].isActive ? 'Active Timers' : 'Inactive Timers'}</h2>
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
          {timers.map((timer) => (
            <TimerRow
              key={timer.id}
              timer={timer}
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
