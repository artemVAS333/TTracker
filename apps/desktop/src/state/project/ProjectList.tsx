import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setActiveProject } from '../../state/project/projectSlice';
import { useState } from 'react';

export default function ProjectList() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleSelectProject = (projectId: string) => {
    dispatch(setActiveProject(projectId));
    setDropdownOpen(dropdownOpen === projectId ? null : projectId);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects:</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4">
            <button
              className={`w-full text-left p-3 bg-blue-500 text-white rounded-lg ${activeProjectId === project.id ? 'bg-blue-600' : ''}`}
              onClick={() => handleSelectProject(project.id)}
            >
              {project.name}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${dropdownOpen === project.id ? 'h-auto' : 'h-0'}`}
            >
              <ul className="bg-white border rounded-lg shadow-lg mt-2">
                {project.tasks.map((task) => (
                  <li key={task.id} className="p-2 hover:bg-blue-100 cursor-pointer">
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
