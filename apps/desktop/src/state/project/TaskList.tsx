import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addTask, startTask, stopTask } from './projectSlice';
import { useState } from 'react';

export default function TaskList() {
  const dispatch = useDispatch();
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const activeProject = useSelector((state: RootState) => state.project.projects.find((p) => p.id === activeProjectId));

  const [taskName, setTaskName] = useState('');

  if (!activeProject) return <p>Choose project</p>;

  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask({ projectId: activeProject.id, title: taskName }));
      setTaskName('');
    }
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2>{activeProject.name}</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {activeProject.tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.isActive ? '⏳ working' : '🛑 stopped'}
            <button
              onClick={() => dispatch(startTask({ projectId: activeProject.id, taskId: task.id }))}
              disabled={task.isActive}
            >
              Start
            </button>
            <button
              onClick={() => dispatch(stopTask({ projectId: activeProject.id, taskId: task.id }))}
              disabled={!task.isActive}
            >
              Stop
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
