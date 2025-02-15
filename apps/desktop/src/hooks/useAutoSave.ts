import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { saveProjectsToStorage } from '../utils/storage';

const useAutoSave = () => {
  const projects = useSelector((state: RootState) => state.project.projects);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isSaving) {
      setIsSaving(true);
      saveProjectsToStorage(projects);
      setIsSaving(false);
    }
  }, [projects, isSaving]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (projects.length > 0 && !isSaving) {
        setIsSaving(true);
        saveProjectsToStorage(projects);
        setIsSaving(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [projects, isSaving]);
};

export default useAutoSave;
