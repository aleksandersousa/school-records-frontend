export interface SelectProps {
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  width?: string;
  value?: string | number;
  defaultValue?: string | number;
  error?: boolean;
  disabled?: boolean;
  options: Array<{ label: string; value: string | number }>;
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}
