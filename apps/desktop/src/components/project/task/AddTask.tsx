import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setActiveProject } from '../../../state/project/projectSlice';
import { RootState } from '../../../state/store';

const AddTask = () => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState('');
  const projects = useSelector((state: RootState) => state.project.projects);
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (taskTitle.trim() && activeProjectId) {
      dispatch(addTask({ projectId: activeProjectId, title: taskTitle }));
      setTaskTitle('');
    }
  };

  return (
    <div className="mb-4">
      <span className="text-xl font-semibold mb-2">Choose Project:</span>
      <select
        name="Choose Project"
        value={activeProjectId}
        onChange={(e) => dispatch(setActiveProject(e.target.value))}
        className="p-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
      >
        <option value="Choose Project" hidden className="text-gray-500">
          Choose Project...
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id} className="text-gray-800">
            {project.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleAddTask} className="flex space-x-2 mt-4">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
          placeholder="Title of the task"
          autoComplete="off"
        />
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded-lg ${activeProjectId ? '' : 'opacity-50 cursor-not-allowed'} transition duration-200 ease-in-out`}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
