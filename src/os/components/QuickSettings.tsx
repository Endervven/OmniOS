import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOSStore } from '../../store';
import * as Icons from 'lucide-react';
import { cn } from '../../utils';

const QuickSettingButton = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-3 rounded-2xl transition-all",
      active ? "bg-blue-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"
    )}
  >
    <Icon size={20} className="mb-2" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export const QuickSettings: React.FC = () => {
  const { isQuickSettingsOpen, toggleQuickSettings } = useOSStore();
  const [wifi, setWifi] = React.useState(true);
  const [bluetooth, setBluetooth] = React.useState(false);
  const [dnd, setDnd] = React.useState(false);
  const [dark, setDark] = React.useState(true);

  return (
    <AnimatePresence>
      {isQuickSettingsOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleQuickSettings} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-10 right-4 w-80 bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl z-50 p-4 text-white overflow-hidden"
          >
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                <Icons.User size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Guest User</div>
                <div className="text-xs text-white/50">Local Account</div>
              </div>
              <div className="flex-1" />
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Icons.Settings size={16} />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <QuickSettingButton icon={Icons.Wifi} label="Wi-Fi" active={wifi} onClick={() => setWifi(!wifi)} />
              <QuickSettingButton icon={Icons.Bluetooth} label="Bluetooth" active={bluetooth} onClick={() => setBluetooth(!bluetooth)} />
              <QuickSettingButton icon={Icons.Moon} label="Do Not Disturb" active={dnd} onClick={() => setDnd(!dnd)} />
              <QuickSettingButton icon={Icons.Monitor} label="Dark Mode" active={dark} onClick={() => setDark(!dark)} />
            </div>

            {/* Sliders */}
            <div className="space-y-4 px-2">
              <div className="flex items-center space-x-3">
                <Icons.Sun size={16} className="text-white/70" />
                <input type="range" className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" defaultValue={80} />
              </div>
              <div className="flex items-center space-x-3">
                <Icons.Volume2 size={16} className="text-white/70" />
                <input type="range" className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" defaultValue={50} />
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between px-2">
              <div className="text-xs text-white/50">Battery: 85%</div>
              <button className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center">
                <Icons.Power size={12} className="mr-1" /> Shut Down
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
