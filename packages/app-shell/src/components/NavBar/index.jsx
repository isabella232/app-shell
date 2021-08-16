import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ApolloClient } from '@apollo/client';

import Cross from '@bufferapp/ui/Icon/Icons/Cross';
import InfoIcon from '@bufferapp/ui/Icon/Icons/Info';
import ArrowLeft from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import PersonIcon from '@bufferapp/ui/Icon/Icons/Person';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import PeopleIcon from '@bufferapp/ui/Icon/Icons/People';
import GearIcon from '@bufferapp/ui/Icon/Icons/Gear';
import ChannelsIcon from '@bufferapp/ui/Icon/Icons/Channels';

import {
  blue,
  blueDarker,
  gray,
  grayDark,
  grayLight,
  grayLighter,
} from '@bufferapp/ui/style/colors';

import { fontFamily, fontWeightMedium } from '@bufferapp/ui/style/fonts';

import Link from '@bufferapp/ui/Link';
import DropdownMenu from '@bufferapp/ui/DropdownMenu';

import BufferLogo from './components/BufferLogo';
import NavBarMenu from './components/NavBarMenu/NavBarMenu';
import NavBarProducts from './components/NavBarProducts/NavBarProducts';
import UpgradeCTA from './components/UpgradeCTA';
import { useUser } from '../../common/context/User';
import { ModalContext } from '../../common/context/Modal';
import { MODALS } from '../../common/hooks/useModal';
import useOrgSwitcher from '../../common/hooks/useOrgSwitcher';
import { isFreePlan } from '../../common/hooks/utils/segmentTraitGetters'

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

function getUrlEnvModifier() {
  const [hostname, envModifier] = window.location.hostname.match(/\w+\.(\w+\.)buffer\.com/) || [null, null]
  return envModifier
}

export function getBillingUrl() {
  const envModifier = getUrlEnvModifier()
  return `https://account.${envModifier ? envModifier : ''}buffer.com/billing`;
}

export function getTeamInviteUrl(user) {
  const envModifier = getUrlEnvModifier()
  return `https://${envModifier ? envModifier : ''}buffer.com/manage/${user.currentOrganization.id}/team-members/invite
  `
}

export function getTeamManageUrl(user) {
  const envModifier = getUrlEnvModifier()
  return `https://${envModifier ? envModifier : ''}buffer.com/manage/${user.currentOrganization.id}/team-members
  `
}

function getManageChannelsURL(baseUrl) {
  const envModifier = getUrlEnvModifier()
  return `https://account.${envModifier ? envModifier : ''}buffer.com/channels`;
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
    case 'shopify':
      return <ShopifyIcon size="medium" />;
    default:
      break;
  }
  return null;
}

function buildOrgSwitcher(user, selectOrganization) {
  if (user.organizations.length === 1) {
    return [];
  }

  const channels = user?.organizations?.map(o => o.channels).flat() || [];
  const orgSwitcher = {
    title: 'Organizations',
    hideTooltips: !channels,
    menuItems: user.organizations.map((org, index) => {
      const isCurrentOrganization = user.currentOrganization
        ? user.currentOrganization.id === org.id
        : index === 0;
      return {
        id: org.id,
        title: org.name,
        selected: isCurrentOrganization,
        hasDivider: index === 0,
        subItems: channels
          .filter((channel) => channel?.organizationId === org.id)
          .map((channel) => ({
            id: channel.id,
            title: channel.name,
            network: channel.service,
          })),
        onItemClick: () => {
          if (!isCurrentOrganization) {
            selectOrganization(org.id);
          }
        },
      };
    }),
  };

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

const NavBar = React.memo((props) => {
  const {
    activeProduct,
    onLogout,
    displaySkipLink,
    onOrganizationSelected,
  } = props;

  const user = useUser();
  const switchOrganization = useOrgSwitcher();

  const selectOrganization = (organizationId) => {
    switchOrganization(organizationId, {
      onCompleted: () => onOrganizationSelected(organizationId),
    });
  };
  const organizations = buildOrgSwitcher(user, selectOrganization);

  let isFree = isFreePlan(user);
  let subscription = null;
  let canStartTrial = false;
  let isOneBufferOrganization = false;
  const shouldDisplayInviteCTA =  user?.currentOrganization?.shouldDisplayInviteCTA;
  if (user.currentOrganization.billing) {
    subscription = user?.currentOrganization?.billing?.subscription;
    canStartTrial = user?.currentOrganization?.billing.canStartTrial;
    isOneBufferOrganization = user?.currentOrganization?.isOneBufferOrganization;
  }

  const menuItems = [
    // This is only needed for Publish
    (window.location.href.match(/publish/)) ? {
      id: 'preferences',
      title: 'My Preferences',
      icon: <GearIcon color={gray} />,
      onItemClick: () => {
        window.location.pathname  = '/preferences/general'
      },
    } : null,
    {
      id: 'channels',
      title: 'Channels',
      icon: <ChannelsIcon color={gray} />,
      onItemClick: () => {
        window.location.assign(getManageChannelsURL());
      },
    },
    {
      id: 'openTeam',
      title: 'Team',
      icon: <PeopleIcon color={gray} />,
      onItemClick: () => {
        window.location.assign(getTeamManageUrl(user));
      },
    },
  ]

  const helpMenuItems = [
    {
      id: 'Help Center',
      title: 'Visit Help Center',
      onItemClick: () => { window.open(
        'https://support.buffer.com/hc/en-us/?utm_source=app&utm_medium=appshell&utm_campaign=appshell',
        '_blank'
      ); },
    },
    {
      id: 'Quick Help',
      title: 'Quick Help',
      onItemClick: () => {
        if (window.zE) {
          window.zE('webWidget', 'show');
          window.zE('webWidget', 'open');
        }
      },
    },
    {
      id: 'Status',
      title: 'Status',
      onItemClick: () => { window.location.assign('https://status.buffer.com/'); },
    },
    {
      id: 'Pricing & Plans',
      title: 'Pricing & Plans',
      onItemClick: () => { window.location.assign('https://buffer.com/pricing'); },
    },
    {
      id: 'Wishlist',
      title: 'Wishlist',
      onItemClick: () => { window.location.assign('https://buffer.com/feature-request'); },
    },
  ]

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <NavBarStyled aria-label="Main menu">
          <NavBarLeft>
            {displaySkipLink && (
              <SkipToMainLink href="#main">Skip to main content</SkipToMainLink>
            )}
            <BufferLogo />
            <NavBarVerticalRule />
            <NavBarProducts activeProduct={activeProduct} />
          </NavBarLeft>
          <NavBarRight>
            <UpgradeCTA />
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
            <NavBarVerticalRule />
            <DropdownMenu
              xPosition="right"
              ariaLabel="Account Menu"
              ariaLabelPopup="Account"
              horizontalOffset="-16px"
              isImpersonation={user.isImpersonation}
              menubarItem={
                <NavBarMenu user={user} isImpersonation={user.isImpersonation} />
              }
              items={[
                ...organizations,
                {
                  id: 'account',
                  title: 'Account',
                  icon: <PersonIcon color={gray} />,
                  hasDivider: organizations.length > 1,
                  onItemClick: () => {
                    window.location.assign(
                      getAccountUrl(window.location.href, user)
                    );
                  },
                },
                ...menuItems,
                (shouldDisplayInviteCTA) ? {
                  id: 'Invite Your Team',
                  title: 'Invite Your Team',
                  icon: <PeopleIcon color={blue} />,
                  colors: { title: 'blue', iconHover: 'blueDaker' },
                  hasDivider: true,
                  onItemClick: () => {
                    window.location = getTeamInviteUrl(user)
                  },
                } : null,
                (isFree && !isOneBufferOrganization) ? {
                  id: 'upgrade',
                  title: 'Upgrade',
                  icon: <FlashIcon color={blue} />,
                  colors: { title: 'blue', iconHover: 'blueDaker' },
                  hasDivider: true,
                  onItemClick: () => {
                    window.location = getBillingUrl()
                  },
                } : null,
                (isFree && !canStartTrial && isOneBufferOrganization) ? {
                  id: 'upgrade',
                  title: 'Upgrade',
                  icon: <FlashIcon color={blue} />,
                  colors: { title: 'blue', iconHover: 'blueDaker' },
                  hasDivider: true,
                  onItemClick: () => {
                    openModal(MODALS.planSelector, {
                      cta: 'upgradePlanNavigatorMenu',
                      ctaButton: 'upgradePlan',
                      isUpgradeIntent: true,
                    })
                  },
                } : null,
                (isFree && canStartTrial && isOneBufferOrganization) ? {
                  id: 'start trial',
                  title: 'Start a free trial',
                  icon: <FlashIcon color={blue} />,
                  colors: { title: 'blue', iconHover: 'blueDaker' },
                  hasDivider: true,
                  onItemClick: () => {
                    openModal(MODALS.startTrial, {
                      cta: 'startTrialNavigatorMenu',
                      ctaButton: 'startTrial',
                      isUpgradeIntent: true,
                    })
                  },
                } : null,
                user.isImpersonation
                  ? {
                      id: 'Stop Impersonation',
                      title: 'Stop Impersonation',
                      icon: <Cross color={gray} />,
                      hasDivider: menuItems && menuItems.length > 0,
                      onItemClick: () => {
                        window.location.assign(getStopImpersonationUrl());
                      },
                    }
                  : {
                      id: 'logout',
                      title: 'Logout',
                      icon: <ArrowLeft color={gray} />,
                      hasDivider: menuItems && menuItems.length > 0,
                      onItemClick: () => {
                        if (typeof onLogout === 'function') onLogout();
                        window.location.assign(
                          getLogoutUrl(window.location.href)
                        );
                      },
                    },
              ].filter((e) => e)}
            />
          </NavBarRight>
        </NavBarStyled>
      )}
    </ModalContext.Consumer>
  );
});

NavBar.propTypes = {
  /** The currently active (highlighted) product in the `NavBar`. */
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'engage']),

  onLogout: PropTypes.func,
  displaySkipLink: PropTypes.bool,

  onOrganizationSelected: PropTypes.func,
  menuItems: PropTypes.array,
  graphqlConfig: PropTypes.shape({
    client: PropTypes.instanceOf(ApolloClient),
  }),
};

NavBar.defaultProps = {
  activeProduct: undefined,
  onLogout: undefined,
  displaySkipLink: false,
  onOrganizationSelected: () => {},
  graphqlConfig: {},
};

export default NavBar;
