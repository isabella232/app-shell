import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ApolloClient } from '@apollo/client';

import Cross from '@bufferapp/ui/Icon/Icons/Cross';
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

import { white, blue, gray, grayLighter } from '@bufferapp/ui/style/colors';

import Link from '@bufferapp/ui/Link';
import DropdownMenu from '@bufferapp/ui/DropdownMenu';

import BufferLogoWithWords from './components/BufferLogoWithWords';
import NavBarMenu from './components/NavBarMenu/NavBarMenu';
import NavBarProducts from './components/NavBarProducts/NavBarProducts';
import UpgradeCTA from './components/UpgradeCTA';
import { useUser } from '../../common/context/User';
import { ModalContext } from '../../common/context/Modal';
import { MODALS } from '../../common/hooks/useModal';
import useOrgSwitcher from '../../common/hooks/useOrgSwitcher';
import { isFreePlan } from '../../common/hooks/utils/segmentTraitGetters';

import NavBarDropdown from './components/NavBarDropdown';
import {
  getHelpDropdownItems,
  getAppsDropdownItems,
} from './utils/dropdown-items';

export function getProductPath(baseUrl) {
  const result = baseUrl.match(/https*:\/\/(.+)\.buffer\.com/);
  let productPath = baseUrl;
  if (result instanceof Array) {
    [, productPath] = result;
  }
  return productPath;
}

export function getQueryParameters(baseUrl) {
  const query = baseUrl.match(/\?(?<query>.*)$/)?.groups?.query;
  // NOTE: returned with a starting "&", because it is always used after the
  // initial query parameter, "?redirect="
  return query ? `&${encodeURI(query)}` : '';
}

function getRedirectUrl(baseUrl) {
  const productPath = getProductPath(baseUrl);
  return `https://${productPath}.buffer.com`;
}

function getRedirectUrlWithParams(baseUrl) {
  return `${getRedirectUrl(baseUrl)}${getQueryParameters(baseUrl)}${encodeURI(
    window.location.hash
  )}`;
}

function getLoginOrLogoutUrl(baseUrl = '', loginOrLogoutPath) {
  const productPath = getProductPath(baseUrl);
  const result = `https://login${
    productPath.includes('local') ? '.local' : ''
  }.buffer.com/${loginOrLogoutPath}?redirect=${getRedirectUrlWithParams(
    baseUrl
  )}`;
  return result;
}

export function getLogoutUrl(baseUrl) {
  return getLoginOrLogoutUrl(baseUrl, 'logout');
}

export function getLoginUrl(baseUrl) {
  return getLoginOrLogoutUrl(baseUrl, 'login');
}

function getUrlEnvModifier() {
  const [, envModifier] = window.location.hostname.match(
    /\w+\.(\w+\.)buffer\.com/
  ) || [null, null];
  return envModifier;
}

export function getAccountUrl() {
  const envModifier = getUrlEnvModifier();
  return `https://account.${envModifier || ''}buffer.com/`;
}

export function getBillingUrl() {
  const envModifier = getUrlEnvModifier();
  return `https://account.${envModifier || ''}buffer.com/billing`;
}

export function getTeamInviteUrl(user) {
  const envModifier = getUrlEnvModifier();
  return `https://${envModifier || ''}buffer.com/manage/${
    user.currentOrganization.id
  }/team-members/invite
  `;
}

export function getTeamManageUrl(user) {
  const envModifier = getUrlEnvModifier();
  return `https://${envModifier || ''}buffer.com/manage/${
    user.currentOrganization.id
  }/team-members
  `;
}

function getManageChannelsURL() {
  const envModifier = getUrlEnvModifier();
  return `https://account.${envModifier || ''}buffer.com/channels`;
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
  background: linear-gradient(180deg, ${white} 73.44%, ${grayLighter} 100%);
  border-bottom: 1px solid ${gray};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09), inset 0px -1px 0px ${grayLighter};
  display: flex;
  height: 64px;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const NavBarLeft = styled.div`
  display: flex;
`;
const NavBarRight = styled.nav`
  display: flex;
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

  const channels = user?.organizations?.map((o) => o.channels).flat() || [];
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
  const { activeProduct, onLogout, displaySkipLink, onOrganizationSelected } =
    props;

  const user = useUser();
  const switchOrganization = useOrgSwitcher();

  const selectOrganization = (organizationId) => {
    switchOrganization(organizationId, {
      onCompleted: () => onOrganizationSelected(organizationId),
    });
  };
  const organizations = buildOrgSwitcher(user, selectOrganization);

  const isFree = isFreePlan(user);
  let canStartTrial = false;
  let isOneBufferOrganization = false;
  const shouldDisplayInviteCTA =
    user?.currentOrganization?.shouldDisplayInviteCTA;
  if (user.currentOrganization.billing) {
    canStartTrial = user?.currentOrganization?.billing.canStartTrial;
    isOneBufferOrganization =
      user?.currentOrganization?.isOneBufferOrganization;
  }

  const menuItems = [
    // This is only needed for Publish
    window.location.href.match(/publish/)
      ? {
          id: 'preferences',
          title: 'My Preferences',
          icon: <GearIcon color={gray} />,
          onItemClick: () => {
            window.location.pathname = '/preferences/general';
          },
        }
      : null,
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
  ];

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <NavBarStyled aria-label="Main menu">
          <NavBarLeft>
            {displaySkipLink && (
              <SkipToMainLink href="#main">Skip to main content</SkipToMainLink>
            )}
            <BufferLogoWithWords />
            <NavBarProducts
              activeProduct={activeProduct}
              currentOrganization={user?.currentOrganization}
            />
          </NavBarLeft>
          <NavBarRight>
            <UpgradeCTA />
            <NavBarDropdown
              title="Apps"
              dropdownItems={getAppsDropdownItems()}
            />
            <NavBarDropdown
              title="Help"
              dropdownItems={getHelpDropdownItems()}
            />
            <DropdownMenu
              xPosition="right"
              ariaLabel="Account Menu"
              ariaLabelPopup="Account"
              horizontalOffset="-16px"
              isImpersonation={user.isImpersonation}
              menubarItem={
                <NavBarMenu
                  user={user}
                  isImpersonation={user.isImpersonation}
                />
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
                      getAccountUrl()
                    );
                  },
                },
                ...menuItems,
                shouldDisplayInviteCTA
                  ? {
                      id: 'Invite Your Team',
                      title: 'Invite Your Team',
                      icon: <PeopleIcon color={blue} />,
                      colors: { title: 'blue', iconHover: 'blueDaker' },
                      hasDivider: true,
                      onItemClick: () => {
                        window.location = getTeamInviteUrl(user);
                      },
                    }
                  : null,
                isFree && !isOneBufferOrganization
                  ? {
                      id: 'upgrade',
                      title: 'Upgrade',
                      icon: <FlashIcon color={blue} />,
                      colors: { title: 'blue', iconHover: 'blueDaker' },
                      hasDivider: true,
                      onItemClick: () => {
                        window.location = getBillingUrl();
                      },
                    }
                  : null,
                isFree && !canStartTrial && isOneBufferOrganization
                  ? {
                      id: 'upgrade',
                      title: 'Upgrade',
                      icon: <FlashIcon color={blue} />,
                      colors: { title: 'blue', iconHover: 'blueDaker' },
                      hasDivider: true,
                      onItemClick: () => {
                        openModal(MODALS.planSelector, {
                          cta: 'ugradePlan',
                          ctaButton: 'ugradePlan',
                          isUpgradeIntent: true,
                        });
                      },
                    }
                  : null,
                isFree && canStartTrial && isOneBufferOrganization
                  ? {
                      id: 'start trial',
                      title: 'Start a free trial',
                      icon: <FlashIcon color={blue} />,
                      colors: { title: 'blue', iconHover: 'blueDaker' },
                      hasDivider: true,
                      onItemClick: () => {
                        openModal(MODALS.startTrial, {
                          cta: 'startFreeTrial',
                          ctaButton: 'startFreeTrial',
                          isUpgradeIntent: true,
                        });
                      },
                    }
                  : null,
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
  activeProduct: PropTypes.oneOf([
    'publish',
    'analyze',
    'engage',
    'start-page',
  ]),

  onLogout: PropTypes.func,
  displaySkipLink: PropTypes.bool,

  onOrganizationSelected: PropTypes.func,
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
