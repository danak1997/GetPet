import { Position } from '@capacitor/geolocation';
import {
  IonCard, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, useIonModal, IonList, IonItem, IonInput, IonLabel, IonTextarea, IonImg
} from '@ionic/react';
import { useState } from 'react';
import http from '../utils/http';

type ReportModalProps = {
  onDismiss: () => void;
  location: Position;
  image: string;
}

const ReportModal = ({ location, image, onDismiss }: ReportModalProps) => {
  const [locationText, setLocationText] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const sendReport = async () => {
    if (!locationText || !description) return;

    await http('/api/reports', {
      method: 'POST',
      body: JSON.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        location: locationText,
        image,
        description
      })
    });
    onDismiss();
  };

  return (
      <div>
          <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle size="large">דיווח</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onDismiss}>סגור</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonCard>
                <IonImg src={image}></IonImg>
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">מיקום</IonLabel>
                    <IonInput value={locationText} placeholder="ליד הכניסה של הבניין" onIonChange={(e) => setLocationText(e.detail.value || '')}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">פרטים</IonLabel>
                    <IonTextarea value={description} placeholder="פרטים נוספים" onIonChange={(e) => setDescription(e.detail.value || '')}></IonTextarea>
                  </IonItem>
                  <IonButton expand="block" onClick={sendReport}>שלח</IonButton>
                </IonList>
            </IonCard>
        </>
      </div>
  );
};

export const useReportModal = () => {
  const [location, setLocation] = useState<Position>();
  const [image, setImage] = useState<string>();
  const [presentReportModal, dismissReportModal] = useIonModal(ReportModal, {
      onDismiss: () => dismissReportModal(),
      location,
      image
  });

  const openReportModal = ({ location, image }: Omit<ReportModalProps, 'onDismiss'>) => {
      setLocation(location);
      setImage(image);
      presentReportModal({ swipeToClose: true });
  };

  return { openReportModal };
};

export default ReportModal;
