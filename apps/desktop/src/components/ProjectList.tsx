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
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleSelectProject = (projectId: string) => {
    if (activeProjectId === projectId) {
      dispatch(unSetActiveProject());
      setExpandedProject(null);
    } else {
      dispatch(setActiveProject(projectId));
      setExpandedProject(projectId);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
    if (confirmed) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <div>
      <AddTask />
      <PinnedTask />
      <h2 className="text-2xl font-semibold mb-4">{projects.length > 0 ? 'Projects:' : 'No projects'}</h2>
      <ul>
        {[...projects].reverse().map((project) => {
          const isActive = activeProjectId === project.id;
          const isExpanded = expandedProject === project.id;
          return (
            <li key={project.id} className="mb-4">
              <div className="flex items-center gap-2">
                <button
                  className={`h-8 flex-1 text-left p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => handleSelectProject(project.id)}
                >
                  {project.name} {isExpanded ? '▲' : '▼'}
                </button>
                <button className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">
                  +
                </button>
                <button
                  className="h-8 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </div>
              {isExpanded && (
                <div
                  className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}
                >
                  <div className="mt-2 p-2 border rounded-lg bg-gray-100">
                    <TaskList />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
