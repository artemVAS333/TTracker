import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  isActive: boolean;
  startTime?: number;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

interface ProjectState {
  projects: Project[];
  activeProjectId?: string;
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<string>) => {
      state.projects.push({
        id: crypto.randomUUID(),
        name: action.payload,
        tasks: [],
      });
    },
    setActiveProject: (state, action: PayloadAction<string>) => {
      state.activeProjectId = action.payload;
    },
    addTask: (state, action: PayloadAction<{ projectId: string; title: string }>) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.tasks.push({
          id: crypto.randomUUID(),
          title: action.payload.title,
          isActive: false,
        });
      }
    },
    startTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.tasks = project.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, isActive: true, startTime: Date.now() } : task,
        );
      }
    },
    stopTask: (state, action: PayloadAction<{ projectId: string; taskId: string }>) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        project.tasks = project.tasks.map((task) =>
          task.id === action.payload.taskId ? { ...task, isActive: false } : task,
        );
      }
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { addProject, setActiveProject, addTask, startTask, stopTask, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
