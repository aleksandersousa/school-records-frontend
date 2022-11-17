import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from 'styled-components';
import { Icon } from '@iconify/react';
import { EditTableRowProps } from './typing';

const EditTableRow: React.FC<EditTableRowProps> = ({
  options,
  hideOption,
  onClickMenuItem,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="Menu"
        aria-owns={open ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={(e): void => onClickMenu(e)}
      >
        <Icon
          icon="mdi:dots-vertical"
          color="inherit"
          style={{ color: theme.colors.primary.default }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            minWidth: 145,
          },
        }}
      >
        {options?.map(
          option =>
            option.key !== hideOption && (
              <MenuItem
                key={option.key}
                onClick={(): void => {
                  onClickMenuItem(option.key);
                  handleClose();
                }}
              >
                {option.component}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

export default EditTableRow;
