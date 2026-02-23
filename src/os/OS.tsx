import React, { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { AppDrawer } from './components/AppDrawer';
import { QuickSettings } from './components/QuickSettings';
import { useOSStore } from '../store';
import { apps } from './apps';
import * as Icons from 'lucide-react';

export const OS: React.FC = () => {
  const { windows, openWindow } = useOSStore();
  const [bgUrl, setBgUrl] = useState('url("https://picsum.photos/seed/omnios/1920/1080?blur=2")');

  // Prevent default context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Set initial CSS variable
    document.documentElement.style.setProperty('--os-bg', bgUrl);
    
    // Observer for background changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const newBg = document.documentElement.style.getPropertyValue('--os-bg');
          if (newBg && newBg !== bgUrl) {
            setBgUrl(newBg);
          }
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      observer.disconnect();
    };
  }, [bgUrl]);

  const desktopApps = apps.filter(a => ['browser', 'files', 'gallery', 'settings'].includes(a.id));

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000"
        style={{ 
          backgroundImage: bgUrl,
          filter: 'brightness(0.8) contrast(1.1)'
        }}
      />
      
      {/* Desktop Area */}
      <div className="absolute inset-0 z-10 pt-12 pb-24 px-6 flex flex-col flex-wrap gap-6 items-start justify-start content-start">
        {/* Desktop Icons */}
        {desktopApps.map(app => {
          const IconComponent = (Icons as any)[app.icon] || Icons.HelpCircle;
          return (
            <button
              key={app.id}
              onDoubleClick={() => openWindow(app.id, app.name, app.defaultWidth, app.defaultHeight)}
              className="flex flex-col items-center justify-center w-20 space-y-1.5 group focus:outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 group-focus:ring-2 group-focus:ring-blue-500/50 transition-all shadow-lg">
                <IconComponent size={28} className="text-white drop-shadow-md" strokeWidth={1.5} />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md px-1.5 py-0.5 rounded group-focus:bg-blue-500/80">{app.name}</span>
            </button>
          );
        })}

        {/* Render Windows */}
        {windows.map((windowState) => (
          <Window key={windowState.id} windowState={windowState} />
        ))}
      </div>

      {/* OS Chrome */}
      <TopBar />
      <Dock />
      <AppDrawer />
      <QuickSettings />
    </div>
  );
};
