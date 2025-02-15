import useTask from './hooks/useTask';
import Form from './components/Form';
import TaskList from './components/TaskList';

export default function App() {
  const { tasks, addTask, deleteTask, startTask, stopTask, resetTask } = useTask();

  const activeTasks = tasks.filter((task) => task.isActive);
  const inactiveTasks = tasks.filter((task) => !task.isActive);

  return (
    <>
      <Form addTask={addTask} />
      {activeTasks.length > 0 && (
        <TaskList tasks={activeTasks} onStart={startTask} onStop={stopTask} onReset={resetTask} onDelete={deleteTask} />
      )}
      {inactiveTasks.length > 0 && (
        <TaskList
          tasks={inactiveTasks}
          onStart={startTask}
          onStop={stopTask}
          onReset={resetTask}
          onDelete={deleteTask}
        />
      )}
    </>
  );
}
