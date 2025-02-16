import { Project } from '../types/projectTypes';

export const saveProjectsToStorage = (projects: Project[]) => {
  window.electron.store.set('projects', JSON.stringify(projects));
};

export const loadProjectsFromStorage = (): Project[] => {
  const data = window.electron.store.get('projects');
  return data ? JSON.parse(data as string) : [];
};
