import Form from './components/Form';
import { useRef, useState } from 'react';
import { timeFormat } from './utils/timeFormat';

interface Timer {
  id: number;
  title: string;
  description: string;
  time: number;
  isActive: boolean;
}

export default function App() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const intervals = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const addTimer = (title: string, description?: string) => {
    const newTimer = { id: Date.now(), title, description: description || '', time: 0, isActive: false };
    setTimers((prev) => [...prev, newTimer]);
    window.electron.store.set('timers', [...timers, newTimer]);
  };

  const deleteTimer = (id: number) => {
    clearInterval(intervals.current[id]);
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  };

  const startTimer = (id: number) => {
    if (intervals.current[id]) return;

    intervals.current[id] = setInterval(
      () => setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, time: timer.time + 1 } : timer))),
      1000,
    );

    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, isActive: true } : timer)));
  };

  const stopTimer = (id: number) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];

    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, isActive: false } : timer)));
  };

  return (
    <>
      <Form addTimer={addTimer} />
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead className="bg-gray-200">
          <tr>
            {/* <th className="border border-gray-300 px-4 py-2 w-12">ID</th> */}
            <th className="border border-gray-300 px-4 py-2 w-12">№</th>
            <th className="border border-gray-300 px-4 py-2">Timer Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {timers.map((timer) => (
            <tr key={timer.id}>
              {/* <td className="border border-gray-300 px-4 py-2">{timer.id}</td> */}
              <td className="border border-gray-300 px-4 py-2">{timers.indexOf(timer) + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{timer.title}</td>
              <td className="border border-gray-300 px-4 py-2">{timer.description}</td>
              <td className="border border-gray-300 px-4 py-2">{timeFormat(timer.time)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="mr-2" onClick={() => (timer.isActive ? stopTimer(timer.id) : startTimer(timer.id))}>
                  {timer.isActive ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => deleteTimer(timer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
