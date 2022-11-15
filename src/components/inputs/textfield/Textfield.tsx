import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Container, ErrorMessage, Input, Label, Wrapper } from './styles';
import { TextfieldProps } from './typing';
import { useTheme } from 'styled-components';

const Textfield: React.FC<TextfieldProps> = ({
  ref,
  label,
  placeholder,
  errorMessage,
  width,
  type,
  maxLength,
  error,
  disabled,
  value,
  onChange,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <Container>
      {Boolean(label) && <Label>{label}</Label>}

      <Wrapper>
        <Input
          ref={ref}
          width={width}
          className={disabled ?? false ? 'disabled' : ''}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
        />
        {type === 'password' &&
          (showPassword ? (
            <Icon
              icon="mdi:eye"
              style={{ color: theme.colors.primary.active }}
              onClick={togglePassword}
            />
          ) : (
            <Icon
              icon="mdi:eye-off"
              width={24}
              height={24}
              style={{ color: theme.colors.primary.active }}
              onClick={togglePassword}
            />
          ))}
      </Wrapper>

      {(error ?? false) && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

export default Textfield;
