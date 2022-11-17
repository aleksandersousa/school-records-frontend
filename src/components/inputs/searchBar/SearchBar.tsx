import { Icon } from '@iconify/react';
import React from 'react';
import { Container, Input } from './styles';
import { SearchBarProps } from './typing';

const SearchBar: React.FC<SearchBarProps> = ({
  id,
  name,
  placeholder,
  width,
  maxLength,
  disabled,
  searchIcon = <Icon icon="mdi:magnify" width={24} height={24} />,
  textColor,
  value,
  onChange,
  onKeyPress,
}) => {
  return (
    <Container width={width} className="mySearchBar">
      <div className={`input ${disabled ? 'disabled' : ''}`}>
        <Input
          id={id}
          name={name}
          width={width}
          className={disabled ? 'disabled' : ''}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          color={textColor?.placeholder}
          onChange={(e): void => onChange?.(e.target.value)}
          onKeyPress={onKeyPress}
        />
        {searchIcon}
      </div>
    </Container>
  );
};

export default SearchBar;
