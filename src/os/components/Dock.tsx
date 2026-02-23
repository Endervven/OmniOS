import React from 'react';
import { motion } from 'motion/react';
import { useOSStore } from '../../store';
import { apps } from '../apps';
import * as Icons from 'lucide-react';
import { cn } from '../../utils';

export const Dock: React.FC = () => {
  const { windows, openWindow, activeWindowId, toggleAppDrawer, isAppDrawerOpen } = useOSStore();

  const handleAppClick = (appId: string, title: string, defaultWidth?: number, defaultHeight?: number) => {
    // Check if app is already open
    const openAppWindows = windows.filter(w => w.appId === appId);
    if (openAppWindows.length > 0) {
      // Focus the first one
      useOSStore.getState().focusWindow(openAppWindows[0].id);
    } else {
      openWindow(appId, title, defaultWidth, defaultHeight);
    }
  };

  // Apps to show in dock: pinned apps + running apps
  const pinnedAppIds = ['browser', 'files', 'notes', 'settings'];
  const runningAppIds = Array.from(new Set(windows.map(w => w.appId)));
  const dockAppIds = Array.from(new Set([...pinnedAppIds, ...runningAppIds]));

  const dockApps = dockAppIds.map(id => apps.find(a => a.id === id)).filter(Boolean) as typeof apps;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="bg-white/20 dark:bg-black/30 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center space-x-2 pointer-events-auto shadow-2xl">
        
        {/* App Drawer Button */}
        <button
          onClick={toggleAppDrawer}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/20",
            isAppDrawerOpen ? "bg-white/30" : "bg-white/10"
          )}
        >
          <Icons.LayoutGrid className="text-white" size={24} />
        </button>

        <div className="w-px h-8 bg-white/20 mx-1" />

        {dockApps.map((app) => {
          const IconComponent = (Icons as any)[app.icon] || Icons.HelpCircle;
          const isRunning = windows.some(w => w.appId === app.id);
          const isActive = windows.some(w => w.appId === app.id && w.id === activeWindowId);

          return (
            <div key={app.id} className="relative group">
              <button
                onClick={() => handleAppClick(app.id, app.name, app.defaultWidth, app.defaultHeight)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-2",
                  isActive ? "bg-white/20 shadow-inner" : "hover:bg-white/10"
                )}
              >
                <IconComponent className="text-white drop-shadow-md" size={26} strokeWidth={1.5} />
              </button>
              
              {/* Running indicator */}
              {isRunning && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80" />
              )}

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap backdrop-blur-md">
                {app.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
