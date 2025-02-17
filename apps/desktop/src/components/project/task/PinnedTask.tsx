import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import Task from './Task';

export default function PinnedTask() {
  const projects = useSelector((state: RootState) => state.project.projects);

  const pinnedTasks = projects.flatMap((project) =>
    project.tasks.filter((task) => task.pinned).map((task) => ({ ...task, project })),
  );

  return (
    <div>
      <h2>{pinnedTasks.length > 0 ? 'Pinned Tasks:' : null}</h2>
      <ul>
        {pinnedTasks.map((task) => (
          <Task key={task.id} task={task} project={task.project} />
        ))}
      </ul>
    </div>
  );
}
