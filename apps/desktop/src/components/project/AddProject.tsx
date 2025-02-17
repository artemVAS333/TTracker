import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../state/project/projectSlice';

export default function AddProject() {
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      dispatch(addProject(projectName));
      setProjectName('');
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2 dark:text-white">Add Project</h3>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
          placeholder="Name of the project"
          autoComplete="off"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Add Project
        </button>
      </form>
    </div>
  );
}
