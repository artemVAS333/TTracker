import { useCallback, useEffect, useRef, useState } from 'react';

interface Timer {
  id: number;
  title: string;
  description: string;
  time: number;
  isActive: boolean;
}

export function useTimers() {
  const [timers, updateTimers] = useState<Timer[]>([]);
  const intervals = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const loadTimersFromStore = useCallback(() => {
    const storedTimers = getStoredTimers();
    const updatedTimers = storedTimers.map((timer) => ({ ...timer, isActive: false }));
    updateTimers(updatedTimers);
  }, []);

  useEffect(() => {
    loadTimersFromStore();
    window.ipcRenderer.on('window-closed', loadTimersFromStore);
    return () => window.ipcRenderer.off('window-closed', loadTimersFromStore);
  }, [loadTimersFromStore]);

  const getStoredTimers = (): Timer[] => {
    const storedTimers = window.electron.store.get('timers') || [];
    return Array.isArray(storedTimers) ? storedTimers : [];
  };

  const setStoredTimers = (timers: Timer[]) => window.electron.store.set('timers', timers);

  const addTimer = (title: string, description?: string) => {
    const newTimer: Timer = { id: Date.now(), title, description: description || '', time: 0, isActive: false };
    updateTimersAndStore((prevTimers) => [...prevTimers, newTimer]);
  };

  const deleteTimer = (id: number) => {
    clearIntervalIfExists(id);
    updateTimersAndStore((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  const startTimer = (id: number) => {
    if (intervals.current.has(id)) return;

    const timerInterval = setInterval(
      () => updateTimers((prevTimers) => prevTimers.map((timer) => (timer.id === id ? incrementTimer(timer) : timer))),
      1000,
    );

    intervals.current.set(id, timerInterval);
    updateTimersAndStore((prevTimers) => setTimerActiveState(prevTimers, id, true));
  };

  const stopTimer = (id: number) => {
    clearIntervalIfExists(id);
    updateTimersAndStore((prevTimers) => setTimerActiveState(prevTimers, id, false));
  };

  const resetTimer = (id: number) => {
    clearIntervalIfExists(id);
    updateTimersAndStore((prevTimers) => resetTimerState(prevTimers, id));
  };

  const updateTimersAndStore = (updateFn: (timers: Timer[]) => Timer[]) => {
    updateTimers((prevTimers) => {
      const updatedTimers = updateFn(prevTimers);
      setStoredTimers(updatedTimers);
      return updatedTimers;
    });
  };

  const incrementTimer = (timer: Timer): Timer => ({ ...timer, time: timer.time + 1 });

  const setTimerActiveState = (timers: Timer[], id: number, isActive: boolean): Timer[] =>
    timers.map((timer) => (timer.id === id ? { ...timer, isActive } : timer));

  const resetTimerState = (timers: Timer[], id: number): Timer[] =>
    timers.map((timer) => (timer.id === id ? { ...timer, time: 0, isActive: false } : timer));

  const clearIntervalIfExists = (id: number) => {
    const timerInterval = intervals.current.get(id);
    if (timerInterval) {
      clearInterval(timerInterval);
      intervals.current.delete(id);
    }
  };

  return { timers, addTimer, deleteTimer, startTimer, stopTimer, resetTimer };
}
