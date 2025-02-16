import { useDispatch } from 'react-redux';
import { deleteTask, pinTask, startTask, stopTask, unPinTask } from '../state/project/projectSlice';

interface TaskProps {
  projectId: string;
  task: Readonly<{
    id: string;
    title: string;
    isActive: boolean;
    pinned?: boolean;
  }>;
}

export default function Task({ projectId, task }: Readonly<TaskProps>) {
  const dispatch = useDispatch();

  return (
    <div>
      {task.title} - {task.isActive ? '⏳ working' : '🛑 stopped'}
      <button
        onClick={() => {
          task.isActive
            ? dispatch(stopTask({ projectId, taskId: task.id }))
            : dispatch(startTask({ projectId, taskId: task.id }));
        }}
      >
        {task.isActive ? 'Stop' : 'Start'}
      </button>
      <button
        className={task.pinned ? 'bg-yellow-500' : ''}
        onClick={() => {
          task.pinned
            ? dispatch(unPinTask({ projectId, taskId: task.id }))
            : dispatch(pinTask({ projectId, taskId: task.id }));
        }}
      >
        {task.pinned ? 'Unpin' : 'Pin'}
      </button>
      <button onClick={() => dispatch(deleteTask({ projectId, taskId: task.id }))}>Delete</button>
    </div>
  );
}
