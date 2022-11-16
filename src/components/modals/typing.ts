export interface ModalProps {
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  title?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
  show: boolean;
  divider?: boolean;
  padding?: { top: string; left: string; bottom: string; right: string };
  onClose: () => unknown;
}

export interface ContainerProps {
  width?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  padding?: { top: string; left: string; bottom: string; right: string };
}

export interface BackgroundProps {
  show: boolean;
}
