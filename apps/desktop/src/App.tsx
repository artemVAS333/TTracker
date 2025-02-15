import ProjectList from './state/project/ProjectList';
import TaskList from './state/project/TaskList';
import AddProject from './state/project/AddProject';
import AddTask from './state/project/AddTask';
import useAutoSave from './hooks/useAutoSave';

export default function App() {
  useAutoSave();
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">TTracker</h1>
      <AddProject />
      <ProjectList />
      <AddTask />
      <TaskList />
    </div>
  );
}
