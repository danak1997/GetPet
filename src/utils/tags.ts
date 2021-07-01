import { home, person, barbell } from 'ionicons/icons';
import { colors } from './colors';

export const tags = {
    houseTrained: 'houseTrained',
    kidFriendly: 'kidFriendly',
    trained: 'trained'
};

export const tagsData = {
    [tags.houseTrained]: {
        text: 'מחונך לצרכים',
        icon: home,
        color: colors[0]
    },
    [tags.kidFriendly]: {
        text: 'מתאים לילדים',
        icon: person,
        color: colors[1]
    },
    [tags.trained]: {
        text: 'מאולף',
        icon: barbell,
        color: colors[2]
    },
};
