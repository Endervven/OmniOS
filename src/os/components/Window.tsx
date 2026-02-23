import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { useOSStore } from '../../store';
import { WindowState } from '../../types';
import { X, Minus, Maximize2 } from 'lucide-react';
import { apps } from '../apps';
import { cn } from '../../utils';

interface WindowProps {
  windowState: WindowState;
}

export const Window: React.FC<WindowProps> = ({ windowState }) => {
  const { id, appId, title, isMinimized, isMaximized, zIndex, position, size } = windowState;
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize, activeWindowId } = useOSStore();
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();
  
  const isActive = activeWindowId === id;
  const appDef = apps.find(a => a.id === appId);
  const AppContent = appDef?.component || (() => <div>App not found</div>);

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateWindowPosition(id, { x: position.x + info.offset.x, y: position.y + info.offset.y });
      }}
      initial={false}
      animate={{
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 32 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 32px - 80px)' : size.height, // Subtract top bar and dock area
        zIndex,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "absolute rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl flex flex-col",
        isActive ? "ring-1 ring-blue-500/50" : "opacity-95"
      )}
      onMouseDown={() => focusWindow(id)}
      style={{ position: 'absolute' }}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-zinc-100/50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700/50 flex items-center justify-between px-3 select-none"
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="flex items-center space-x-2 w-1/3">
          {/* macOS style buttons */}
          <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group">
            <X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group">
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group">
            <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
          </button>
        </div>
        
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 w-1/3 text-center truncate">
          {title}
        </div>
        
        <div className="w-1/3" /> {/* Spacer for centering */}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto relative bg-white dark:bg-zinc-950">
        {/* Overlay to block pointer events when not active, making dragging smoother if there are iframes */}
        {!isActive && <div className="absolute inset-0 z-50" />}
        <AppContent />
      </div>
      
      {/* Resize Handle (Bottom Right) */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;

            const onMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
              const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
              updateWindowSize(id, { width: newWidth, height: newHeight });
            };

            const onMouseUp = () => {
              document.removeEventListener('mousemove', onMouseMove);
              document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
          }}
        />
      )}
    </motion.div>
  );
};
