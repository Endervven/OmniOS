export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  component: React.FC<any>;
  defaultWidth: number;
  defaultHeight: number;
  isSystem?: boolean;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
