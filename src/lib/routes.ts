import { IconProp } from "@fortawesome/fontawesome-svg-core"

export const ROUTE_ITEMS = {
  OVERVIEW: { 
    icon: ['fas', 'home'] as IconProp,
    link: '/',
    text: 'Acceuil'
  },
  PLAYERS: { 
    icon: ['fas', 'user'] as IconProp,
    link: '/players',
    text: 'Joueurs'
  },
  MATCHS: { 
    icon: ['fas', 'basketball'] as IconProp,
    text: 'Matchs', 
    link: '/matchs' 
  }
}
