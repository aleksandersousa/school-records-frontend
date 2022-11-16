export interface ButtonProps {
  text?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (arg?: unknown) => unknown;
}
