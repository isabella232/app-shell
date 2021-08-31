import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from '@bufferapp/ui/DropdownMenu';
import ChevronDownIcon from '@bufferapp/ui/Icon/Icons/ChevronDown';

import { NavBarDropdownStyled, NavBarDropdownText } from './style';

const NavBarDropdown = (props) => {
  const { title, dropdownItems } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <>
      <DropdownMenu
        xPosition="right"
        ariaLabel={`${title} Menu`}
        ariaLabelPopup={title}
        menubarItem={
          <NavBarDropdownStyled>
            <NavBarDropdownText>{title}</NavBarDropdownText>
            <ChevronDownIcon color="greyDark" size="large" />
          </NavBarDropdownStyled>
        }
        items={dropdownItems}
      />
    </>
  );
};

const DropdownItemsShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

NavBarDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.shape(DropdownItemsShape))
    .isRequired,
};

export default NavBarDropdown;
