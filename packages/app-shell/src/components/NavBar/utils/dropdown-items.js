import { getActiveProductFromPath } from '../../../common/utils/getProduct';

function getHelpDropdownItems() {
  const dropdownItems = [
    {
      id: 'Help Center',
      title: 'Visit Help Center',
      onItemClick: () => {
        window.open(
          'https://support.buffer.com/hc/en-us/?utm_source=app&utm_medium=appshell&utm_campaign=appshell',
          '_blank'
        );
      },
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
      onItemClick: () => {
        window.open('https://status.buffer.com/', '_blank');
      },
    },
    {
      id: 'Pricing & Plans',
      title: 'Pricing & Plans',
      onItemClick: () => {
        window.open('https://buffer.com/pricing', '_blank');
      },
    },
    {
      id: 'Wishlist',
      title: 'Wishlist',
      onItemClick: () => {
        window.open('https://buffer.com/feature-request', '_blank');
      },
    },
    {
      id: 'Changelog',
      title: 'Changelog',
      onItemClick: () => {
        window.open('https://buffer.com/changelog', '_blank');
      },
    },
  ];
  // Only show "Getting Started" link for publishing product
  const activeProduct = getActiveProductFromPath();
  if (activeProduct === 'publish') {
    dropdownItems.unshift({
      id: 'Getting Started',
      title: 'Getting Started',
      onItemClick: () => {}, // Will open Pendo popup through classname
    });
  }

  return dropdownItems;
}

function getAppsDropdownItems() {
  return [
    {
      id: 'Buffer-for-iOS',
      title: 'Buffer for iOS',
      onItemClick: () => {
        window.open(
          'https://apps.apple.com/app/apple-store/id490474324?pt=936146&ct=TopBarAppsDropdown&mt=8',
          '_blank'
        );
      },
    },
    {
      id: 'Buffer-for-Android',
      title: 'Buffer for Android',
      onItemClick: () => {
        window.open(
          'https://play.google.com/store/apps/details?id=org.buffer.android',
          '_blank'
        );
      },
    },
    {
      id: 'Remix-by-Buffer',
      title: 'Remix by Buffer',
      onItemClick: () => {
        window.open('https://buffer.com/remix', '_blank');
      },
    },
    {
      id: 'Integrations',
      title: 'Integrations',
      onItemClick: () => {
        window.open('https://buffer.com/extras', '_blank');
      },
    },
  ];
}

export { getHelpDropdownItems, getAppsDropdownItems };
