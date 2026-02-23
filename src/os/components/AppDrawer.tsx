import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store';
import { apps } from '../apps';
import * as Icons from 'lucide-react';

export const AppDrawer: React.FC = () => {
  const { isAppDrawerOpen, toggleAppDrawer, openWindow } = useOSStore();
  const [search, setSearch] = useState('');

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isAppDrawerOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-12 md:p-24 pointer-events-none"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto" 
            onClick={toggleAppDrawer}
          />
          
          {/* Drawer Content */}
          <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
            
            {/* Search Bar */}
            <div className="p-6 border-b border-white/10">
              <div className="relative">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input 
                  type="text"
                  placeholder="Search apps..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  autoFocus
                />
              </div>
            </div>

            {/* App Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
                {filteredApps.map(app => {
                  const IconComponent = (Icons as any)[app.icon] || Icons.HelpCircle;
                  return (
                    <button
                      key={app.id}
                      onClick={() => {
                        openWindow(app.id, app.name, app.defaultWidth, app.defaultHeight);
                        toggleAppDrawer();
                      }}
                      className="flex flex-col items-center space-y-2 group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 transition-all shadow-lg">
                        <IconComponent size={32} className="text-white drop-shadow-md" strokeWidth={1.5} />
                      </div>
                      <span className="text-white text-sm font-medium drop-shadow-md">{app.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {filteredApps.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <Icons.SearchX size={48} className="mb-4 opacity-50" />
                  <p>No apps found matching "{search}"</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
