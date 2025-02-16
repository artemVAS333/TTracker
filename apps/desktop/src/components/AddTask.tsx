import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { addTask, setActiveProject } from '../state/project/projectSlice';

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
      <span className="text-xl font-semibold mb-2">Chose Project</span>
      <select
        name="Choose Project"
        value={activeProjectId}
        onChange={(e) => dispatch(setActiveProject(e.target.value))}
      >
        <option value="Choose Project" hidden>
          Choose Project...
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleAddTask} className="flex space-x-2">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="p-2 border rounded-lg w-64"
          placeholder="Title of the task"
          autoComplete="off"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
