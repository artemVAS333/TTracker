import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startTask, stopTask } from './projectSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const activeProject = useSelector((state: RootState) => state.project.projects.find((p) => p.id === activeProjectId));

  if (!activeProject) return <p>Choose project</p>;

  return (
    <div>
      <h2>{activeProject.name}</h2>
      <ul>
        {activeProject.tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.isActive ? '⏳ working' : '🛑 stopped'}
            <button
              onClick={() =>
                task.isActive
                  ? dispatch(stopTask({ projectId: activeProject.id, taskId: task.id }))
                  : dispatch(startTask({ projectId: activeProject.id, taskId: task.id }))
              }
            >
              {task.isActive ? 'Stop' : 'Start'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
