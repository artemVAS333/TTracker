import ProjectList from './state/project/ProjectList';
import TaskList from './state/project/TaskList';
import AddProject from './state/project/AddProject';
import AddTask from './state/project/AddTask';
import useAutoSave from './hooks/useAutoSave';

export default function App() {
  useAutoSave();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">TTracker</h1>
        <AddProject />
        <ProjectList />
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}
