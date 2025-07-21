import React, { useState } from 'react';
import { Calendar, AlertTriangle, Edit2, Trash2, Clock } from 'lucide-react';
import { Task, Project } from '../types';

interface TaskCardProps {
  task: Task;
  project?: Project;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  project,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const isOverdue = !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
  const isDueToday = task.dueDate && 
    new Date(task.dueDate).toDateString() === new Date().toDateString();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays < 7) return `${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div 
      className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <button
            onClick={onToggle}
            className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 mt-0.5 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              
              {(showActions || window.innerWidth < 768) && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={onEdit}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onDelete}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {task.description && (
              <p className={`text-gray-600 mb-4 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center flex-wrap gap-3">
              {project && (
                <span 
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${project.color}20`, 
                    color: project.color 
                  }}
                >
                  {project.name}
                </span>
              )}

              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              {task.dueDate && (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  isOverdue 
                    ? 'text-red-700 bg-red-100' 
                    : isDueToday 
                    ? 'text-orange-700 bg-orange-100' 
                    : 'text-gray-600 bg-gray-100'
                }`}>
                  {isOverdue ? <Clock className="w-3 h-3 mr-1" /> : <Calendar className="w-3 h-3 mr-1" />}
                  {formatDueDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};