import { ChangeEvent } from 'react';

export interface TextfieldProps {
  className?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  width?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  maxLength?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement> | undefined) => unknown;
}

export interface WrapperProps {
  width?: string;
  error?: boolean;
}
