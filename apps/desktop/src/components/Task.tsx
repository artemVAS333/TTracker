import { useDispatch } from 'react-redux';
import { deleteTask, pinTask, startTask, stopTask, unPinTask } from '../state/project/projectSlice';
import { Project, Task as TaskOfProject } from '../types/projectTypes';

interface TaskProps {
  task?: TaskOfProject;
  project?: Project;
}

export default function Task({ task, project }: Readonly<TaskProps>) {
  const dispatch = useDispatch();

  if (!task || !project) return <div className="p-4 border rounded-lg bg-gray-100">Loading task...</div>;

  const handlers = {
    start: () => dispatch(startTask({ projectId: project.id, taskId: task.id })),
    stop: () => dispatch(stopTask({ projectId: project.id, taskId: task.id })),
    delete: () => dispatch(deleteTask({ projectId: project.id, taskId: task.id })),
    pin: () => dispatch(pinTask({ projectId: project.id, taskId: task.id })),
    unPin: () => dispatch(unPinTask({ projectId: project.id, taskId: task.id })),
  };

  return (
    <div className="p-4 border rounded-lg flex items-center justify-between">
      <span className="font-semibold">
        {task.title} - {task.isActive ? '⏳ Working' : '🛑 Stopped'}
      </span>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${task.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          onClick={task.isActive ? handlers.stop : handlers.start}
        >
          {task.isActive ? 'Stop' : 'Start'}
        </button>

        <button
          className={`px-3 py-1 rounded ${task.pinned ? 'bg-yellow-500 text-black' : 'bg-gray-300'}`}
          onClick={task.pinned ? handlers.unPin : handlers.pin}
        >
          {task.pinned ? 'Unpin' : 'Pin'}
        </button>

        <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={handlers.delete}>
          Delete
        </button>
      </div>
    </div>
  );
}
