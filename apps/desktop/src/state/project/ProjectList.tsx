import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  deleteTask,
  delteProject,
  pinTask,
  setActiveProject,
  startTask,
  stopTask,
  unPinTask,
} from '../../state/project/projectSlice';
import { useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

export default function ProjectList() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);
  const activeProjectId = useSelector((state: RootState) => state.project.activeProjectId);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleSelectProject = (projectId: string) => {
    dispatch(setActiveProject(projectId));
    setDropdownOpen(dropdownOpen === projectId ? null : projectId);
  };

  const reversedProjects = [...projects].reverse();

  return (
    <div>
      <h2>Pinned Tasks:</h2>
      <ul>
        {reversedProjects.map((projects) =>
          projects.tasks
            .filter((task) => task.pinned)
            .map((task) => (
              <li key={task.id}>
                {task.title} - {task.isActive ? '⏳ working' : '🛑 stopped'}
                <button
                  onClick={() =>
                    task.isActive
                      ? dispatch(stopTask({ projectId: projects.id, taskId: task.id }))
                      : dispatch(startTask({ projectId: projects.id, taskId: task.id }))
                  }
                >
                  {task.isActive ? 'Stop' : 'Start'}
                </button>
                <button
                  className={task.pinned == true ? 'bg-yellow-500' : ``}
                  onClick={() => {
                    task.pinned == false
                      ? dispatch(pinTask({ projectId: projects.id, taskId: task.id }))
                      : dispatch(unPinTask({ projectId: projects.id, taskId: task.id }));
                  }}
                >
                  {task.pinned != true ? 'Pin' : 'Unpin'}
                </button>
                <button onClick={() => dispatch(deleteTask({ projectId: projects.id, taskId: task.id }))}>
                  Delete
                </button>
              </li>
            )),
        )}
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Projects:</h2>
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
              onClick={() => dispatch(delteProject(project.id))}
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
