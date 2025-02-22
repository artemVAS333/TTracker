export interface Task {
  id: string;
  title: string;
  isActive: boolean;
  pinned: boolean;
  startTime?: number;
}

export interface TaskState {
  tasks: Task[];
}
