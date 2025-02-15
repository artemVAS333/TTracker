import { useEffect, useRef, useState } from 'react';

interface Timer {
  id: number;
  title: string;
  description: string;
  time: number;
  isActive: boolean;
}

export function useTimers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const intervals = useRef<Map<number, NodeJS.Timeout>>(new Map()); // Changed to a Map

  useEffect(() => {
    const storedTimers = window.electron.store.get('timers') || [];
    const updatedTimers = (Array.isArray(storedTimers) ? storedTimers : []).map((timer) => ({
      ...timer,
      isActive: false,
    }));
    setTimers(updatedTimers);

    const handleWindowClose = () => {
      setTimers((prevTimers) => {
        const newTimers = prevTimers.map((timer) => ({ ...timer, isActive: false }));
        window.electron.store.set('timers', newTimers);
        return newTimers;
      });
    };

    window.ipcRenderer.on('window-closed', handleWindowClose);
    return () => window.ipcRenderer.off('window-closed', handleWindowClose);
  }, []);

  const updateTimerInStore = (updatedTimer: Timer) => {
    const storedTimers = (window.electron.store.get('timers') as Timer[]) || [];
    const timerIndex = storedTimers.findIndex((timer: Timer) => timer.id === updatedTimer.id);

    if (timerIndex !== -1) {
      storedTimers[timerIndex] = { ...storedTimers[timerIndex], ...updatedTimer };
      window.electron.store.set('timers', storedTimers);
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
    const timerInterval = intervals.current.get(id);
    if (timerInterval) {
      clearInterval(timerInterval); // Clear the interval
      intervals.current.delete(id); // Remove from Map
    }

    setTimers((prev) => {
      const updatedTimers = prev.filter((timer) => timer.id !== id);
      window.electron.store.set('timers', updatedTimers);
      return updatedTimers;
    });
  };

  const startTimer = (id: number) => {
    if (intervals.current.has(id)) return; // Check if the timer is already running

    intervals.current.set(
      id,
      setInterval(() => {
        setTimers((prevTimers) => {
          return prevTimers.map((timer) => {
            if (timer.id === id) {
              const updatedTimer = { ...timer, time: timer.time + 1 };
              updateTimerInStore(updatedTimer); // Update the store
              return updatedTimer;
            }
            return timer;
          });
        });
      }, 1000),
    );

    setTimers((prevTimers) => prevTimers.map((timer) => (timer.id === id ? { ...timer, isActive: true } : timer)));
  };

  const stopTimer = (id: number) => {
    const timerInterval = intervals.current.get(id);
    if (timerInterval) {
      clearInterval(timerInterval); // Clear the interval
      intervals.current.delete(id); // Remove from Map
    }

    setTimers((prevTimers) => prevTimers.map((timer) => (timer.id === id ? { ...timer, isActive: false } : timer)));
  };

  const resetTimer = (id: number) => {
    const timerInterval = intervals.current.get(id);
    if (timerInterval) {
      clearInterval(timerInterval); // Clear the interval
      intervals.current.delete(id); // Remove from Map
    }

    setTimers((prevTimers) =>
      prevTimers.map((timer) => (timer.id === id ? { ...timer, time: 0, isActive: false } : timer)),
    );
  };

  return { timers, addTimer, deleteTimer, startTimer, stopTimer, resetTimer };
}
