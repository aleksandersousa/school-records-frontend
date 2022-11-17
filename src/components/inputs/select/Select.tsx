import React from 'react';
import { Container, ErrorMessage, StyledSelect, Label } from './styles';
import { SelectProps } from './typing';

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  className,
  placeholder,
  errorMessage,
  width,
  error,
  disabled,
  options,
  value,
  defaultValue,
  onChange,
}) => {
  return (
    <Container width={width} className={className}>
      {label && <Label error={error}>{label}</Label>}
      <StyledSelect
        id={id}
        name={name}
        className={disabled ? 'disabled' : ''}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        <option value="none" selected disabled hidden>
          Selecione uma opção
        </option>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default Select;
