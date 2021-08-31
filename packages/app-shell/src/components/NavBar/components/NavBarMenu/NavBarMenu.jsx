import React from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@bufferapp/ui/Icon/Icons/ChevronDown';

import {
  NavBarStyled,
  NavBarEmail,
  NavBarName,
  NavBarUser,
  NavBarAvatar,
  NavBarChavron,
  NavBarImpersonating,
} from './style';

export function getUserAvatar(user) {
  if (user.avatar) {
    return user.avatar;
  }

  return 'https://s3.amazonaws.com/buffer-ui/Default+Avatar.png';
}

/** NavBar Menu component used by the Select component to show a custom User name and avatar
 *  button */
const NavBarMenu = (props) => {
  const { user } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <NavBarStyled {...props}>
      <NavBarUser>
        {user.isImpersonation && (
          <NavBarImpersonating
            user={user}
            aria-label="You are impersonating a user"
          >
            Impersonating
          </NavBarImpersonating>
        )}
        <NavBarName>{user.name}</NavBarName>
        <NavBarEmail>{user.email}</NavBarEmail>
      </NavBarUser>
      <NavBarAvatar avatar={getUserAvatar(user)} />
      <NavBarChavron>
        <ChevronDownIcon color="grayLight" size="large" />
      </NavBarChavron>
    </NavBarStyled>
  );
};

NavBarMenu.propTypes = {
  /** User Name and Email to be shown in the NavBar */
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    isImpersonation: PropTypes.bool,
  }).isRequired,
};

export default NavBarMenu;
