import { Calculator, Globe, Settings as SettingsIcon, FileText, Image as ImageIcon, Terminal as TerminalIcon } from 'lucide-react';
import { AppDefinition } from '../../types';
import { Browser as BrowserApp } from './Browser';
import { Calculator as CalculatorApp } from './Calculator';
import { Notes as NotesApp } from './Notes';
import { Settings as SettingsApp } from './Settings';
import { Terminal as TerminalApp } from './Terminal';
import { Files as FilesApp } from './Files';
import { Gallery as GalleryApp } from './Gallery';

// Placeholder components for apps
const PlaceholderApp = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center h-full w-full bg-white dark:bg-zinc-900 text-zinc-500">
    {name} App Content
  </div>
);

export const apps: AppDefinition[] = [
  {
    id: 'browser',
    name: 'Browser',
    icon: 'Globe',
    component: BrowserApp,
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: 'Calculator',
    component: CalculatorApp,
    defaultWidth: 320,
    defaultHeight: 480,
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: 'FileText',
    component: NotesApp,
    defaultWidth: 600,
    defaultHeight: 500,
  },
  {
    id: 'files',
    name: 'Files',
    icon: 'Folder',
    component: FilesApp,
    defaultWidth: 700,
    defaultHeight: 500,
  },
  {
    id: 'gallery',
    name: 'Gallery',
    icon: 'Image',
    component: GalleryApp,
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: 'Terminal',
    component: TerminalApp,
    defaultWidth: 600,
    defaultHeight: 400,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Settings',
    component: SettingsApp,
    defaultWidth: 800,
    defaultHeight: 600,
    isSystem: true,
  },
];

export const getAppDefinition = (id: string) => apps.find(a => a.id === id);
