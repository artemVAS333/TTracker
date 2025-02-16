import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Task from './Task';

export default function PinnedTask() {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <div>
      <h2>Pinned Tasks:</h2>
      <ul>
        {projects
          .reduce(
            (acc, project) => {
              const pinnedTasks = project.tasks
                .filter((task) => task.pinned)
                .map((task) => ({ ...task, projectId: project.id }));
              return [...acc, ...pinnedTasks];
            },
            [] as Array<{ id: string; title: string; isActive: boolean; pinned?: boolean; projectId: string }>,
          )
          .map((task) => (
            <Task key={task.id} projectId={task.projectId} task={task} />
          ))}
      </ul>
    </div>
  );
}
