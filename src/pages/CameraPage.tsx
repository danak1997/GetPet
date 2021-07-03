import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import usePhotoGallery from '../utils/usePhotoGallery';

const CameraPage: React.FC = () => {
    const [img, setImg] = useState<string | undefined>();
    const { takePhoto } = usePhotoGallery();

    const getPhoto = async () => {
        try {
            const image = await takePhoto();
            setImg(image.webPath);
        } catch {
            console.log('User cancelled photos app');
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>צלם כלב</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">צלם כלב</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonButton expand="block" onClick={getPhoto}>צלם תמונה</IonButton>
                {img && <IonImg src={img} />}
            </IonContent>
        </IonPage>
    );
};

export default CameraPage;
