export interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (arg?: unknown) => unknown;
}
