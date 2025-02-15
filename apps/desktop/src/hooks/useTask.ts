import { useCallback, useEffect, useRef, useState } from 'react';
import { Task } from '../types/projectTypes';

export default function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const intervals = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const loadTasksFromStore = useCallback(() => {
    const storedTasks = (window.electron.store.get('tasks') as Task[]) || [];
    setTasks(storedTasks.map((task) => ({ ...task, isActive: false })));
  }, []);

  useEffect(() => {
    loadTasksFromStore();
    const handleWindowClosed = () =>
      updateTasksAndStore((tasks) => tasks.map((task) => ({ ...task, isActive: false })));
    window.ipcRenderer.on('window-closed', handleWindowClosed);
    return () => window.ipcRenderer.off('window-closed', handleWindowClosed);
  }, [loadTasksFromStore]);

  const updateTasksAndStore = (updateFn: (tasks: Task[]) => Task[]) => {
    setTasks((prevTasks) => {
      const updatedTasks = updateFn(prevTasks);
      window.electron.store.set('tasks', updatedTasks);
      return updatedTasks;
    });
  };

  const addTask = (title: string, description?: string) => {
    const newTask: Task = { id: Date.now(), title, description: description || '', time: 0, isActive: false };
    updateTasksAndStore((tasks) => [...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    clearIntervalIfExists(id);
    updateTasksAndStore((tasks) => tasks.filter((task) => task.id !== id));
  };

  const startTask = (id: number) => {
    if (intervals.current.has(id)) return;

    const taskInterval = setInterval(() => {
      updateTasksAndStore((tasks) => tasks.map((task) => (task.id === id ? { ...task, time: task.time + 1 } : task)));
    }, 1000);

    intervals.current.set(id, taskInterval);
    updateTaskState(id, { isActive: true });
  };

  const setState = (id: number, option: Partial<Task>) => updateTaskState(id, option);

  const stopTask = (id: number) => {
    clearIntervalIfExists(id);
    setState(id, { isActive: false });
  };
  const resetTask = (id: number) => {
    clearIntervalIfExists(id);
    setState(id, { isActive: false, time: 0 });
  };
  const updateTaskState = (id: number, updates: Partial<Task>) => {
    updateTasksAndStore((tasks) => tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const clearIntervalIfExists = (id: number) => {
    const taskInterval = intervals.current.get(id);
    if (taskInterval) {
      clearInterval(taskInterval);
      intervals.current.delete(id);
    }
  };

  return { tasks, addTask, deleteTask, startTask, stopTask, resetTask };
}
