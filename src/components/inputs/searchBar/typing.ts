export interface SearchBarProps {
  id?: string;
  name?: string;
  placeholder?: string;
  width?: string;
  value?: string;
  maxLength?: number;
  disabled?: boolean;
  searchIcon?: JSX.Element;
  textColor?: {
    label?: string;
    placeholder?: string;
  };
  onChange?: (e?: string) => void;
  onKeyPress?: (e?: unknown) => unknown;
}
