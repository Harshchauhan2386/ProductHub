import React from 'react';
import { Folder, Filter, BarChart3 } from 'lucide-react';
import { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  selectedProject: string;
  onProjectSelect: (projectId: string) => void;
  filterPriority: string;
  onFilterPriorityChange: (priority: string) => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  filterPriority,
  onFilterPriorityChange,
  filterStatus,
  onFilterStatusChange,
}) => {
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-73px)] p-6 overflow-y-auto">
      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Folder className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="font-semibold text-gray-900">Projects</h2>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => onProjectSelect('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              selectedProject === 'all'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>All Tasks</span>
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {projects.reduce((acc, p) => acc + p.taskCount, 0)}
            </span>
          </button>
          
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                selectedProject === project.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: project.color }}
                />
                <span>{project.name}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {project.taskCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => onFilterPriorityChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => onFilterStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="font-semibold text-gray-900">Quick Stats</h2>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-medium text-gray-900">
                {projects.reduce((acc, p) => acc + p.taskCount, 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Projects</span>
              <span className="font-medium text-gray-900">
                {projects.filter(p => p.taskCount > 0).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};