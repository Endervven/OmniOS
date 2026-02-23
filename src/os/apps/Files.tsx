import React, { useState } from 'react';
import { Folder, File, Image as ImageIcon, Music, Video, HardDrive, ChevronRight, Search, Menu } from 'lucide-react';

export const Files: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(['Home']);

  const sidebarItems = [
    { icon: <HardDrive size={18} />, label: 'Home' },
    { icon: <Folder size={18} />, label: 'Documents' },
    { icon: <ImageIcon size={18} />, label: 'Pictures' },
    { icon: <Music size={18} />, label: 'Music' },
    { icon: <Video size={18} />, label: 'Videos' },
  ];

  const files = [
    { type: 'folder', name: 'Projects', date: 'Today, 10:23 AM', size: '--' },
    { type: 'folder', name: 'Work', date: 'Yesterday, 4:15 PM', size: '--' },
    { type: 'folder', name: 'Personal', date: 'Oct 12, 2023', size: '--' },
    { type: 'file', name: 'budget_2024.xlsx', date: 'Oct 10, 2023', size: '24 KB' },
    { type: 'file', name: 'presentation.pptx', date: 'Oct 08, 2023', size: '4.2 MB' },
    { type: 'image', name: 'vacation_photo.jpg', date: 'Oct 05, 2023', size: '1.8 MB' },
  ];

  return (
    <div className="flex h-full w-full bg-white dark:bg-zinc-900">
      {/* Sidebar */}
      <div className="w-48 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex flex-col">
        <div className="p-4">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Favorites</h2>
          <div className="space-y-1">
            {sidebarItems.map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${i === 0 ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        {/* Toolbar */}
        <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
            <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <ChevronRight size={20} />
            </button>
            
            <div className="ml-4 flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {currentPath.map((path, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronRight size={16} className="mx-1 text-zinc-400" />}
                  <span className="cursor-pointer hover:underline">{path}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 rounded-lg py-1.5 pl-9 pr-3 text-sm outline-none text-zinc-800 dark:text-zinc-200 w-48 transition-all"
              />
            </div>
            <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-medium text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Date Modified</th>
                <th className="pb-2 font-medium">Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, i) => (
                <tr key={i} className="group border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                  <td className="py-3 flex items-center space-x-3">
                    {file.type === 'folder' && <Folder size={20} className="text-blue-500 fill-blue-500/20" />}
                    {file.type === 'file' && <File size={20} className="text-zinc-500" />}
                    {file.type === 'image' && <ImageIcon size={20} className="text-purple-500" />}
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{file.name}</span>
                  </td>
                  <td className="py-3 text-sm text-zinc-500">{file.date}</td>
                  <td className="py-3 text-sm text-zinc-500">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
