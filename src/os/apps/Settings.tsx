import React, { useState } from 'react';
import { useOSStore } from '../../store';
import { Monitor, Image as ImageIcon, User, Shield, Wifi, Bluetooth } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personalization');
  
  const tabs = [
    { id: 'network', label: 'Network & Internet', icon: Wifi },
    { id: 'bluetooth', label: 'Bluetooth & Devices', icon: Bluetooth },
    { id: 'personalization', label: 'Personalization', icon: ImageIcon },
    { id: 'accounts', label: 'Accounts', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const backgrounds = [
    'https://picsum.photos/seed/omnios/1920/1080?blur=2',
    'https://picsum.photos/seed/mountain/1920/1080',
    'https://picsum.photos/seed/ocean/1920/1080',
    'https://picsum.photos/seed/forest/1920/1080',
    'https://picsum.photos/seed/city/1920/1080',
    'https://picsum.photos/seed/abstract/1920/1080',
  ];

  return (
    <div className="flex h-full w-full bg-white dark:bg-zinc-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex flex-col p-4">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">Guest User</div>
            <div className="text-xs text-zinc-500">Local Account</div>
          </div>
        </div>

        <div className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'personalization' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Personalization</h2>
            
            <div className="mb-8">
              <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Background</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {backgrounds.map((bg, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      document.documentElement.style.setProperty('--os-bg', `url('${bg}')`);
                    }}
                    className="aspect-video rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all"
                  >
                    <img src={bg} alt={`Background ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Theme</h3>
              <div className="flex space-x-4">
                <button className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:ring-2 hover:ring-blue-500 transition-all">
                  Light
                </button>
                <button className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-900 text-white font-medium hover:ring-2 hover:ring-blue-500 transition-all">
                  Dark
                </button>
                <button className="px-6 py-3 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium transition-all">
                  Auto
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'personalization' && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400">
            <Monitor size={48} className="mb-4 opacity-20" />
            <p>Settings for {tabs.find(t => t.id === activeTab)?.label} are not implemented in this demo.</p>
          </div>
        )}
      </div>
    </div>
  );
};
