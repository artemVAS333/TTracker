import Form from './components/Form';
import { useEffect, useRef, useState } from 'react';
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
  const activeTimers = timers.filter((timer) => timer.isActive);
  const inactiveTimers = timers.filter((timer) => !timer.isActive);

  useEffect(() => {
    const storedTimers = window.electron.store.get('timers') || [];
    setTimers(Array.isArray(storedTimers) ? storedTimers : []);

    window.addEventListener('beforeunload', () => {});
  }, []);

  const updateTimerInStore = (updatedTimer: Timer) => {
    const storedTimers = (window.electron.store.get('timers') as Timer[]) || [];
    const timerIndex = storedTimers.findIndex((timer: Timer) => timer.id === updatedTimer.id);

    if (timerIndex !== -1) {
      storedTimers[timerIndex] = { ...storedTimers[timerIndex], ...updatedTimer };
      window.electron.store.set('timers', storedTimers); // Сохраняем изменённый массив
    }
  };

  const addTimer = (title: string, description?: string) => {
    const newTimer = { id: Date.now(), title, description: description || '', time: 0, isActive: false };
    setTimers((prev) => {
      const updatedTimers = [...prev, newTimer];
      window.electron.store.set('timers', updatedTimers);
      return updatedTimers;
    });
  };

  const deleteTimer = (id: number) => {
    clearInterval(intervals.current[id]);
    setTimers((prev) => {
      const updatedTimers = prev.filter((timer) => timer.id !== id);
      window.electron.store.set('timers', updatedTimers);
      return updatedTimers;
    });
    delete intervals.current[id];
  };

  const startTimer = (id: number) => {
    if (intervals.current[id]) return;

    intervals.current[id] = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = prevTimers.map((timer) => {
          if (timer.id === id) {
            const updatedTimer = { ...timer, time: timer.time + 1 };
            updateTimerInStore(updatedTimer);
            return updatedTimer;
          }
          return timer;
        });
        return updatedTimers;
      });
    }, 1000);

    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => {
        if (timer.id === id) {
          const updatedTimer = { ...timer, isActive: true };
          updateTimerInStore(updatedTimer);
          return updatedTimer;
        }
        return timer;
      });
      return updatedTimers;
    });
  };

  const stopTimer = (id: number) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];

    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => {
        if (timer.id === id) {
          const updatedTimer = { ...timer, isActive: false };
          updateTimerInStore(updatedTimer);
          return updatedTimer;
        }
        return timer;
      });
      return updatedTimers;
    });
  };

  const resetTimer = (id: number) => {
    clearInterval(intervals.current[id]);
    delete intervals.current[id];

    setTimers((prevTimers) => {
      const updatedTimers = prevTimers.map((timer) => {
        if (timer.id === id) {
          const updatedTimer = { ...timer, time: 0, isActive: false };
          updateTimerInStore(updatedTimer);
          return updatedTimer;
        }
        return timer;
      });
      return updatedTimers;
    });
  };

  return (
    <>
      <Form addTimer={addTimer} />

      {/* Active Timers Table */}
      {activeTimers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Timers</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">№</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Timer Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTimers.map((timer, index) => (
                <tr key={timer.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timer.title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timer.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timeFormat(timer.time)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm space-x-2 text-center">
                    <button
                      onClick={() => stopTimer(timer.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
                    >
                      Stop
                    </button>
                    <button
                      onClick={() => resetTimer(timer.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition duration-200"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => deleteTimer(timer.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inactive Timers Table */}
      {inactiveTimers.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Inactive Timers</h2>
          <table className="table-auto border-collapse border border-gray-300 w-full shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">№</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Timer Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {inactiveTimers.map((timer, index) => (
                <tr key={timer.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timer.title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timer.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{timeFormat(timer.time)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm space-x-2 text-center">
                    <button
                      onClick={() => startTimer(timer.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => resetTimer(timer.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none transition duration-200"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => deleteTimer(timer.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
