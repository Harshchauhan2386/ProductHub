import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, Project } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  onToggleTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  projects,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">
          Create your first task or adjust your filters to see tasks here.
        </p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      {pendingTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Active Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                project={projects.find(p => p.id === task.projectId)}
                onToggle={() => onToggleTask(task.id)}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Completed ({completedTasks.length})
          </h2>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                project={projects.find(p => p.id === task.projectId)}
                onToggle={() => onToggleTask(task.id)}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};