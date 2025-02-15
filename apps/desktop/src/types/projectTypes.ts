export interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  time: number;
  isActive: boolean;
}
