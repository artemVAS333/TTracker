import ProjectList from './components/project/ProjectList';
import AddProject from './components/project/AddProject';
import useAutoSave from './hooks/useAutoSave';

export default function App() {
  useAutoSave();
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full p-8 bg-white shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">TTracker</h1>
        {/* <AddProject /> */}
        {/* <ProjectList /> */}
      </div>
    </div>
  );
}
