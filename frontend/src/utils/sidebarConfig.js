export const user = {
  sidebar: [
    {
      item: 'Home',
      icon: 'fas fa-home',
      navigation: '/',
      activeClass: '',
    },
    {
      item: 'Digital Credentials',
      icon: 'fas fa-id-card',
      navigation: '/user/wallet',
      activeClass: 'active',
    },
    {
      item: 'Requests',
      icon: 'fas fa-envelope-open-text',
      navigation: '/user/requests',
      activeClass: 'active',
    },
    {
      item: 'Settings',
      icon: 'fas fa-cog',
      navigation: '/login',
      activeClass: 'active',
    },
  ],
};

export const issuer = {
  sidebar: [
    {
      item: 'Home',
      icon: 'fas fa-home',
      navigation: '/',
      activeClass: '',
    },
    {
      item: 'Requests',
      icon: 'fas fa-envelope-open-text',
      navigation: '/verifier/requests',
      activeClass: 'active',
    },
    {
      item: 'Settings',
      icon: 'fas fa-cog',
      navigation: '/login',
      activeClass: 'active',
    },
  ],
};

export const verifier = {
  sidebar: [
    {
      item: 'Home',
      icon: 'fas fa-home',
      navigation: '/',
      activeClass: '',
    },
    {
      item: 'Requests',
      icon: 'fas fa-envelope-open-text',
      navigation: '/client/requests',
      activeClass: 'active',
    },
    {
      item: 'Custom Requests',
      icon: 'fas fa-mail-bulk',
      navigation: '/client/customrequests',
      activeClass: 'active',
    },
    {
      item: 'Search',
      icon: 'fas fa-search',
      navigation: '/client/search',
      activeClass: 'active',
    },

    {
      item: 'Settings',
      icon: 'fas fa-cog',
      navigation: '/login',
      activeClass: 'active',
    },
  ],
};
