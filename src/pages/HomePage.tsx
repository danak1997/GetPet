import {
  IonContent, IonHeader, IonPage, IonCard, IonIcon, IonLabel, IonChip,
  IonCardHeader, IonImg, IonListHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonTitle, IonToolbar, useIonModal
} from '@ionic/react';
import { format } from 'date-fns';
import { paw } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user';
import { tagsData } from '../utils/tags';
import { usePetModal } from './PetModal';

const HomePage: React.FC = () => {
  const [user] = useContext(UserContext);
  const { openPetModal } = usePetModal();

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
        {user?.savedPets?.length !== 0 && <IonListHeader lines="none">
          נשמרו לאחרונה
        </IonListHeader>}
        {!user?.savedPets?.length && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>אין עדיין חיות שמורות</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            עבור ל<Link to="/adopt">עמוד האימוץ</Link> כדי לשמור חיות
            </IonCardContent>
          </IonCard>
        )}
        {user?.savedPets?.map((animal) => (
          <IonCard button key={animal.id} onClick={() => openPetModal(animal.id)}>
            <IonImg src={animal.profilePhoto} />
            <IonCardHeader>
              <IonCardSubtitle>{format(new Date(animal.updatedAt), 'dd/MM/yy')} - {animal.location}</IonCardSubtitle>
              <IonCardTitle>{animal.name}</IonCardTitle>
              {animal?.addedBy?.name && (
                <IonCardSubtitle>נוסף על ידי {animal?.addedBy?.name}</IonCardSubtitle>
              )}
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
