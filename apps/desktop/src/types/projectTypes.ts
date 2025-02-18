export interface Task {
  id: string;
  title: string;
  isActive: boolean;
  pinned: boolean;
  startTime?: number;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface ProjectState {
  projects: Project[];
  activeProjectId?: string;
}
