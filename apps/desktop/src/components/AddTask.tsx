import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { addTask } from '../state/project/projectSlice';

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState('');

  const dispatch = useDispatch();

  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle.trim() && activeProjectId) {
      dispatch(addTask({ projectId: activeProjectId, title: taskTitle }));
      setTaskTitle('');
    }
  };

  if (!activeProjectId) return null;

  return (
    <div className="mb-4">
      <form onSubmit={handleAddTask} className="flex space-x-2">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="p-2 border rounded-lg w-64"
          placeholder="Title of the task"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
