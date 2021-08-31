function getHelpDropdownItems() {
  return [
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
        window.location.assign('https://status.buffer.com/');
      },
    },
    {
      id: 'Pricing & Plans',
      title: 'Pricing & Plans',
      onItemClick: () => {
        window.location.assign('https://buffer.com/pricing');
      },
    },
    {
      id: 'Wishlist',
      title: 'Wishlist',
      onItemClick: () => {
        window.location.assign('https://buffer.com/feature-request');
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
  ]
};
  
export { getHelpDropdownItems, getAppsDropdownItems };