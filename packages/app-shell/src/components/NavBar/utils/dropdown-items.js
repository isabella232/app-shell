function getHelpDropdownItems() {
  return [
    {
      id: 'Help Center',
      title: 'Help Center',
      onItemClick: () => {
        if (window.zE) {
          window.zE('webWidget', 'show');
          window.zE('webWidget', 'open');
        }
      },
    },
    {
      id: 'Live Chat',
      title: 'Live Chat',
      onItemClick: () => {}, // Will open Pendo popup through classname
    },
    {
      id: 'Status',
      title: 'Status',
      onItemClick: () => {
        window.open(
          'https://status.buffer.com/',
          '_blank'
        );
      },
    },
    {
      id: 'Pricing & Plans',
      title: 'Pricing & Plans',
      onItemClick: () => {
        window.open(
          'https://buffer.com/pricing',
          '_blank'
        );
      },
    },
    {
      id: 'Wishlist',
      title: 'Wishlist',
      onItemClick: () => {
        window.open(
          'https://buffer.com/feature-request',
          '_blank'
        );
      },
    },
  ]
}

function getAppsDropdownItems() {
  return [
    {
      id: 'Buffer-for-iOS',
      title: 'Buffer for iOS',
      onItemClick: () => {
        window.open('https://apps.apple.com/app/apple-store/id490474324?pt=936146&ct=TopBarAppsDropdown&mt=8',
          '_blank')
      },
    },
    {
      id: 'Buffer-for-Android',
      title: 'Buffer for Android',
      onItemClick: () => {
        window.open('https://play.google.com/store/apps/details?id=org.buffer.android',
          '_blank')
      },
    },
    {
      id: 'Remix-by-Buffer',
      title: 'Remix by Buffer',
      onItemClick: () => {
        window.open('https://buffer.com/remix',
          '_blank')
      },
    },
    {
      id: 'Integrations',
      title: 'Integrations',
      onItemClick: () => {
        window.open('https://buffer.com/extras',
          '_blank')
      },
    },
  ]
};
  
export { getHelpDropdownItems, getAppsDropdownItems };
