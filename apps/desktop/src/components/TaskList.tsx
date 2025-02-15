import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { deleteTask, pinTask, startTask, stopTask, unPinTask } from '../state/project/projectSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const activeProject = useSelector((state: RootState) => state.project.projects.find((p) => p.id === activeProjectId));

  if (!activeProject) return <p>Choose project</p>;

  return (
    <div>
      <ul>
        {activeProject.tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.isActive ? '⏳ working' : '🛑 stopped'}
            <button
              onClick={() => {
                task.isActive
                  ? dispatch(stopTask({ projectId: activeProject.id, taskId: task.id }))
                  : dispatch(startTask({ projectId: activeProject.id, taskId: task.id }));
                console.log(task.isActive);
              }}
            >
              {task.isActive ? 'Stop' : 'Start'}
            </button>
            <button
              className={task.pinned == true ? 'bg-yellow-500' : ``}
              onClick={() => {
                task.pinned == false
                  ? dispatch(pinTask({ projectId: activeProject.id, taskId: task.id }))
                  : dispatch(unPinTask({ projectId: activeProject.id, taskId: task.id }));
              }}
            >
              {task.pinned != true ? 'Pin' : 'Unpin'}
            </button>
            <button onClick={() => dispatch(deleteTask({ projectId: activeProject.id, taskId: task.id }))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
