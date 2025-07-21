import { Task, Project } from '../types';

const TASKS_KEY = 'taskflow_tasks';
const PROJECTS_KEY = 'taskflow_projects';

export const taskService = {
  getTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem(TASKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  },

  getProjects: (): Project[] => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveProjects: (projects: Project[]): void => {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save projects:', error);
    }
  },
};