import { home, person, barbell, bandage, bonfire, logoOctocat, paw } from 'ionicons/icons';
import { colors } from './colors';

export const tags = {
    houseTrained: 'houseTrained',
    kidFriendly: 'kidFriendly',
    trained: 'trained',
    vaccinated: 'vaccinated',
    neutered: 'neutered',
    spayed: 'spayed',
    catFriendly: 'catFriendly',
    dogFriendly: 'dogFriendly'
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
    [tags.vaccinated]: {
        text: 'מחוסן',
        icon: bandage,
        color: colors[3]
    },
    [tags.neutered]: {
        text: 'מעוקר',
        icon: bonfire,
        color: colors[4]
    },
    [tags.spayed]: {
        text: 'מעוקרת',
        icon: bonfire,
        color: colors[4]
    },
    [tags.catFriendly]: {
        text: 'ידידותי לחתולים',
        icon: logoOctocat,
        color: colors[5]
    },
    [tags.dogFriendly]: {
        text: 'ידידותי לכלבים',
        icon: paw,
        color: colors[5]
    },
};
