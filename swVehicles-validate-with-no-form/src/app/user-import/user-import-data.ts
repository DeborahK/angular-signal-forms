import { UserProfile } from './user-profile';

// Hard-coded array of users
// represents data retrieved from another system
// for import into this system
export const userArray: UserProfile[] = [
  {
    firstName: 'Hans',
    lastName: 'Solo',
    socialLinks: [
      {
        linkUrl: 'https://www.facebook.com/hans.solo',
        platform: 'Facebook',
        memberSinceYear: '2001'
      },
      {
        linkUrl: 'https://www.linkedin.com/in/hanssolo/',
        platform: 'LinkedIn',
        memberSinceYear: '2001'
      }
    ]
  },
  {
    firstName: 'Darth',
    lastName: 'Vader',
    socialLinks: [
      {
        linkUrl: 'https://www.facebook.com/darth.vader',
        platform: '',
        memberSinceYear: '2010'
      },
      {
        linkUrl: 'https://www.linkedin.com/in/darthvader/',
        platform: 'LinkedIn',
        memberSinceYear: '2056'
      }

    ]
  },
  {
    firstName: 'Boba',
    lastName: 'Fett',
    socialLinks: [
      {
        linkUrl: '/boba.fett',
        platform: 'Facebook',
        memberSinceYear: '2010'
      }
    ]
  },
  {
    firstName: '',
    lastName: 'Chebacca',
    socialLinks: []
  },
  {
    firstName: 'Ahsoka',
    lastName: 'Tano',
    socialLinks: [
      {
        linkUrl: 'https://www.linkedin.com/in/ahsoka/',
        platform: 'LinkedIn',
        memberSinceYear: '2025'
      }
    ]
  },
  {
    firstName: 'Rey',
    lastName: '',
    socialLinks: [
      {
        linkUrl: 'https://www.facebook.com/rey',
        platform: 'Facebook',
        memberSinceYear: '0'
      },
    ]
  }
]
