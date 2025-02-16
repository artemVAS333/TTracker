import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Task from './Task';

export default function TaskList() {
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const activeProject = useSelector((state: RootState) => state.project.projects.find((p) => p.id === activeProjectId));

  if (!activeProject) return;

  return (
    <div>
      <ul>
        {activeProject.tasks.map((task) => (
          <Task key={task.id} projectId={activeProject.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
