import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Cross from '@bufferapp/ui/Icon/Icons/Cross';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import ArrowLeft from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import PersonIcon from '@bufferapp/ui/Icon/Icons/Person';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';

import {
  gray,
  blueDarker,
  grayLight,
  grayLighter,
  grayDark,
} from '@bufferapp/ui/style/colors';

import { fontWeightMedium, fontFamily } from '@bufferapp/ui/style/fonts';

import Link from '@bufferapp/ui/Link';
import DropdownMenu from '@bufferapp/ui/DropdownMenu';

import BufferLogo from './BufferLogo';
import NavBarMenu from './NavBarMenu/NavBarMenu';
import NavBarProducts from './NavBarProducts/NavBarProducts';
import { ENABLE_ENGAGE_URL} from '../index';
import { UserContext } from '../User';

export function getProductPath(baseUrl) {
  const result = baseUrl.match(/https*:\/\/(.+)\.buffer\.com/);
  let productPath = baseUrl;
  if (result instanceof Array) {
    [, productPath] = result;
  }
  return productPath;
}

function getRedirectUrl(baseUrl) {
  const productPath = getProductPath(baseUrl);
  return `https://${productPath}.buffer.com`;
}

export function getLogoutUrl(baseUrl = '') {
  const productPath = getProductPath(baseUrl);
  return `https://login${
    productPath.includes('local') ? '.local' : ''
  }.buffer.com/logout?redirect=${getRedirectUrl(baseUrl)}`;
}

export function getAccountUrl(baseUrl = '', user) {
  return `https://account.buffer.com?redirect=${getRedirectUrl(
    baseUrl
  )}&username=${encodeURI(user.name)}`;
}

export const ORG_SWITCHER = 'org_switcher';

export function getStopImpersonationUrl() {
  const { hostname } = window.location;
  if (!hostname.endsWith('buffer.com')) {
    return null;
  }

  return `https://admin${
    hostname.includes('local') ? '-next.local' : ''
  }.buffer.com/clearImpersonation`;
}

const NavBarStyled = styled.nav`
  background: #fff;
  border-bottom: 1px solid ${gray};
  box-shadow: 0 1px 10px -5px rgba(0, 0, 0, 0.15);
  display: flex;
  height: 56px;
  justify-content: space-between;
  position: relative;
  width: 100vw;
`;

const NavBarLeft = styled.div`
  display: flex;
`;
const NavBarRight = styled.nav`
  display: flex;
`;

const NavBarHelp = styled.a`
  align-items: center;
  color: #fff;
  color: ${(props) => (props.active ? blueDarker : grayDark)};
  display: flex;
  font-size: 16px;
  font-family: ${fontFamily};
  font-weight: ${fontWeightMedium};
  height: 100%;
  padding: 0 24px;
  position: relative;
  text-decoration: none;
  z-index: 2;
  &:hover {
    color: ${(props) => (props.active ? blueDarker : grayDark)};
    background-color: ${grayLighter};
  }
  cursor: pointer;
`;

const NavBarHelpText = styled.span`
  margin-left: 8px;
`;

const NavBarVerticalRule = styled.div`
  background-color: ${grayLight};
  height: 24px;
  margin-left: -1px;
  margin-right: -1px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  z-index: 1;
`;

/**
 * A11Y feature: A skip to main content link appears when a user is on a screen reader
 * and the link is in focus. To work properly, each page will need to have an element with the id main
 * example: <main id="main"></main> This feature is optional
 */
const SkipToMainLink = styled(Link)`
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  overflow: hidden;

  :focus {
    left: auto;
    top: auto;
    position: relative;
    height: auto;
    width: auto;
    overflow: visible;
    margin: auto;
    margin-left: 10px;
  }
`;

export function appendMenuItem(ignoreMenuItems, menuItem) {
  if (!ignoreMenuItems) {
    return menuItem;
  }

  return ignoreMenuItems.includes(menuItem.id) ? null : menuItem;
}

function getNetworkIcon(item) {
  if (!item.network) return null;

  switch (item.network) {
    case 'instagram':
      return <InstagramIcon size="medium" />;
    case 'twitter':
      return <TwitterIcon size="medium" />;
    case 'facebook':
      return <FacebookIcon size="medium" />;
    case 'pinterest':
      return <PinterestIcon size="medium" />;
    case 'linkedin':
      return <LinkedInIcon size="medium" />;
    default:
      break;
  }
  return null;
}

export function appendOrgSwitcher(orgSwitcher) {
  if (!orgSwitcher || !orgSwitcher.menuItems) {
    return [];
  }

  return orgSwitcher.menuItems.map((item, index) => {
    // Adds social icon to each channel
    const subItems = (item.subItems || []).map((subItem) => ({
      ...subItem,
      icon: getNetworkIcon(subItem),
    }));

    return {
      ...item,
      type: ORG_SWITCHER,
      hasDivider: index === 0 && !!orgSwitcher.title,
      dividerTitle: index === 0 && orgSwitcher.title,
      subItems: subItems.length ? subItems : undefined,
      defaultTooltipMessage: orgSwitcher.hideTooltips
        ? ''
        : !subItems.length && 'No channels connected yet.',
    };
  });
}

const products = [
  {
    id: 'publish',
    label: 'Publishing',
    isNew: false
  },
  {
    id: 'analyze',
    label: 'Analytics',
    isNew: false
  },
  {
    id: 'engage',
    label: 'Engagement',
    isNew: true
  }
];

/**
 * The NavBar is not consumed alone, but instead is used by the AppShell component. Go check out the AppShell component to learn more.
 */
class NavBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { isImpersonation, orgSwitcher } = this.props;
    return (
      nextProps.isImpersonation !== isImpersonation ||
      nextProps.orgSwitcher !== orgSwitcher
    );
  }

  render() {
    const {
      activeProduct,
      helpMenuItems,
      onLogout,
      displaySkipLink,
      isImpersonation,
      orgSwitcher,
    } = this.props;

    const user = this.context

    const enabledProducts = user.products.map(product => product.name)
    const engageEnabled = enabledProducts.includes('engage');
    const engageAccess = user.featureFlips.includes('engageRollOut');

    const productsArray = products.map((product) => {
      const productURL = `https://${product.id}.buffer.com`;

      return {
        id: product.id,
        label: product.label,
        isNew: product.isNew,
        href: productURL,
      };
    });


    const orgSwitcherHasItems =
      orgSwitcher && orgSwitcher.menuItems && orgSwitcher.menuItems.length > 0;

    return (
      <NavBarStyled aria-label="Main menu">
        <NavBarLeft>
          {displaySkipLink && (
            <SkipToMainLink href="#main">Skip to main content</SkipToMainLink>
          )}
          <BufferLogo />
          <NavBarVerticalRule />
          <NavBarProducts products={products} activeProduct={activeProduct} />
        </NavBarLeft>
        <NavBarRight>
          {helpMenuItems && (
            <DropdownMenu
              xPosition="right"
              ariaLabel="Help Menu"
              ariaLabelPopup="Help"
              menubarItem={
                <NavBarHelp>
                  <InfoIcon />
                  <NavBarHelpText>Help</NavBarHelpText>
                </NavBarHelp>
              }
              items={helpMenuItems}
            />
          )}
          <NavBarVerticalRule />
          <DropdownMenu
            xPosition="right"
            ariaLabel="Account Menu"
            ariaLabelPopup="Account"
            horizontalOffset="-16px"
            isImpersonation={isImpersonation}
            menubarItem={
              <NavBarMenu user={user} isImpersonation={isImpersonation} />
            }
            items={[
              ...appendOrgSwitcher(orgSwitcher),
              appendMenuItem(user.ignoreMenuItems, {
                id: 'account',
                title: 'Account',
                icon: <PersonIcon color={gray} />,
                hasDivider: orgSwitcherHasItems,
                onItemClick: () => {
                  window.location.assign(
                    getAccountUrl(window.location.href, user)
                  );
                },
              }),
              ...user.menuItems,
              appendMenuItem(
                user.ignoreMenuItems,
                isImpersonation
                  ? {
                      id: 'Stop Impersonation',
                      title: 'Stop Impersonation',
                      icon: <Cross color={gray} />,
                      hasDivider: user.menuItems && user.menuItems.length > 0,
                      onItemClick: () => {
                        window.location.assign(getStopImpersonationUrl());
                      },
                    }
                  : {
                      id: 'logout',
                      title: 'Logout',
                      icon: <ArrowLeft color={gray} />,
                      hasDivider: user.menuItems && user.menuItems.length > 0,
                      onItemClick: () => {
                        if (typeof onLogout === 'function') onLogout();
                        window.location.assign(
                          getLogoutUrl(window.location.href)
                        );
                      },
                    }
              ),
            ].filter((e) => e)}
          />
        </NavBarRight>
      </NavBarStyled>
    );
  }
}

NavBar.contextType = UserContext

NavBar.propTypes = {
  /** The currently active (highlighted) product in the `NavBar`. */
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'engage']),

  helpMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node,
      hasDivider: PropTypes.bool,
      onItemClick: PropTypes.func,
    })
  ),
  isImpersonation: PropTypes.bool,

  onLogout: PropTypes.func,
  displaySkipLink: PropTypes.bool,

  /** Optional menu for selecting the user's organization */
  orgSwitcher: PropTypes.shape({
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func,
      })
    ).isRequired,
  }),
};

NavBar.defaultProps = {
  activeProduct: undefined,
  helpMenuItems: null,
  isImpersonation: false,
  onLogout: undefined,
  displaySkipLink: false,
  orgSwitcher: undefined,
};

export default NavBar;
