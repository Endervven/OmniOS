import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Volume2, Search } from 'lucide-react';
import { useOSStore } from '../../store';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const toggleQuickSettings = useOSStore(state => state.toggleQuickSettings);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 w-full bg-black/20 backdrop-blur-md text-white flex items-center justify-between px-4 text-xs font-medium z-50 fixed top-0 left-0 right-0 select-none">
      <div className="flex items-center space-x-4">
        <span className="font-bold tracking-wider">OmniOS</span>
        <div className="hidden sm:flex space-x-3 opacity-90">
          <span className="cursor-pointer hover:opacity-100">File</span>
          <span className="cursor-pointer hover:opacity-100">Edit</span>
          <span className="cursor-pointer hover:opacity-100">View</span>
          <span className="cursor-pointer hover:opacity-100">Help</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 opacity-90 cursor-pointer hover:opacity-100" onClick={toggleQuickSettings}>
          <Search size={14} />
          <Wifi size={14} />
          <Volume2 size={14} />
          <Battery size={14} />
        </div>
        <div className="cursor-pointer hover:opacity-80" onClick={toggleQuickSettings}>
          {format(time, 'EEE MMM d  h:mm a')}
        </div>
      </div>
    </div>
  );
};
