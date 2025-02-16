import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { deleteProject, setActiveProject, unSetActiveProject } from '../state/project/projectSlice';
import { useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import PinnedTask from './PinnedTask';

export default function ProjectList() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleSelectProject = (projectId: string) => {
    dispatch(setActiveProject(projectId));
    setDropdownOpen(dropdownOpen === projectId ? null : projectId);
    if (activeProjectId === projectId) return dispatch(unSetActiveProject());
  };

  const reversedProjects = [...projects].reverse();

  return (
    <div>
      <PinnedTask />
      <h2 className="text-2xl font-semibold mb-4">{projects.length > 0 ? 'Projects:' : 'Add a project'}</h2>
      <ul>
        {reversedProjects.map((project) => (
          <li key={project.id} className="mb-4">
            <button
              className={`w-full text-left p-3 bg-blue-500 text-white rounded-lg ${activeProjectId === project.id ? 'bg-blue-600' : ''}`}
              onClick={() => handleSelectProject(project.id)}
            >
              {project.name}
              {dropdownOpen === project.id ? '▲' : '▼'}
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
              onClick={() => dispatch(deleteProject(project.id))}
            >
              Delete
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${dropdownOpen === project.id ? 'h-auto' : 'h-0'}`}
            >
              <AddTask />
              <TaskList />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
