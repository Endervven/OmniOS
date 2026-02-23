import { create } from 'zustand';
import { WindowState } from './types';

interface OSState {
  windows: WindowState[];
  activeWindowId: string | null;
  isAppDrawerOpen: boolean;
  isQuickSettingsOpen: boolean;
  openWindow: (appId: string, title: string, defaultWidth?: number, defaultHeight?: number) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  toggleAppDrawer: () => void;
  toggleQuickSettings: () => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  isAppDrawerOpen: false,
  isQuickSettingsOpen: false,

  openWindow: (appId, title, defaultWidth = 600, defaultHeight = 400) => {
    const id = `${appId}-${Date.now()}`;
    const newWindow: WindowState = {
      id,
      appId,
      title,
      isMinimized: false,
      isMaximized: false,
      zIndex: get().windows.length + 1,
      position: { x: 100 + (get().windows.length * 20), y: 100 + (get().windows.length * 20) },
      size: { width: defaultWidth, height: defaultHeight },
    };
    set((state) => ({
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      isAppDrawerOpen: false,
    }));
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (id) => {
    set((state) => {
      const maxZ = Math.max(0, ...state.windows.map((w) => w.zIndex));
      return {
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
        ),
        activeWindowId: id,
      };
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },

  toggleAppDrawer: () => {
    set((state) => ({ isAppDrawerOpen: !state.isAppDrawerOpen, isQuickSettingsOpen: false }));
  },

  toggleQuickSettings: () => {
    set((state) => ({ isQuickSettingsOpen: !state.isQuickSettingsOpen, isAppDrawerOpen: false }));
  },
}));
