import {
  IonContent, IonHeader, IonPage, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonChip,
  IonCardHeader, IonThumbnail, IonImg, IonListHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonTitle, IonToolbar
} from '@ionic/react';
import { home, person, barbell } from 'ionicons/icons';
import { format } from 'date-fns';
import { useContext } from 'react';
import UserContext from '../context/user';
import { colors } from '../utils/colors';
import { tags, tagsData } from '../utils/tags';
import './Tab1.css';

const HomePage: React.FC = () => {
  const [user] = useContext(UserContext);

  // const animals = [
  //   {
  //     id: '0',
  //     name: 'לילי',
  //     description: 'לילי היא כלבה מדהימה וחמודה שאוהבת לעשות לורם איפסום דולור סיט אמט',
  //     profilePhoto: 'https://media.istockphoto.com/photos/cute-miniature-pinscher-dog-picture-id675620796?k=6&m=675620796&s=170667a&w=0&h=_5_CR0IUQ0sunX1aSlWVNX7KM445VBsvD2aGGJb9pVQ=',
  //     tags: [tags.houseTrained]
  //   },
  //   {
  //     id: '02',
  //     name: 'דוגו',
  //     description: 'לילי היא כלבה מדהימה וחמודה שאוהבת לעשות לורם איפסום דולור סיט אמט',
  //     profilePhoto: 'https://static.onecms.io/wp-content/uploads/sites/20/2021/04/21/dog-nose.jpg',
  //     tags: [tags.trained, tags.kidFriendly]
  //   },
  //   {
  //     id: '03',
  //     name: 'גולדי',
  //     description: 'גולדי היא כלבה מדהימה וחמודה שאוהבת לעשות לורם איפסום דולור סיט אמט',
  //     profilePhoto: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg?bust=1513996287',
  //     tags: []
  //   },
  //   {
  //     id: '04',
  //     name: 'פאגפאג',
  //     description: 'פאגפאג היא כלבה מדהימה וחמודה שאוהבת לעשות לורם איפסום דולור סיט אמט',
  //     profilePhoto: 'https://www.psychologicalscience.org/redesign/wp-content/uploads/2021/04/GettyImages-685469924-609x419.jpg',
  //     tags: []
  //   },
  //   {
  //     id: '01',
  //     name: 'חבר',
  //     description: 'חבר הוא הכלב של ארתור מהסדרה ההיא שכולם אוהבים, כלב מתוק שרק רוצה את לורם איפסום דולור סיט אמט',
  //     profilePhoto: 'data:image/jpeg;base64,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',
  //     tags: []
  //   },
  // ];

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonListHeader lines="inset">
          <IonLabel><h1>ברוך הבא, {user.name}</h1></IonLabel>
        </IonListHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ראשי</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader lines="none">
          נשמרו לאחרונה
        </IonListHeader>
        {user?.savedPets?.map((animal) => (
          <IonCard button key={animal.id}>
            <IonImg src={animal.profilePhoto} />
            <IonCardHeader>
              <IonCardSubtitle>{format(new Date(animal.updatedAt), 'dd/MM/yy')}</IonCardSubtitle>
              <IonCardTitle>{animal.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {animal.description}
            </IonCardContent>
            <IonCardContent>
              {animal.tags.map((tagName) => {
                const tag = tagsData[tagName];

                return (
                  <IonChip key={tag.text} outline>
                    <IonIcon icon={tag.icon} color={tag.color} />
                    <IonLabel>{tag.text}</IonLabel>
                  </IonChip>
                );
              })}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
