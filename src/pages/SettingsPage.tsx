import { IonButton, IonCardContent, IonContent, IonHeader, IonImg, IonPage, IonSearchbar, IonTitle, IonToolbar, IonCard } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user';
import { clearToken } from '../utils/auth';
import usePhotoGallery from '../utils/usePhotoGallery';

const SettingsPage: React.FC = () => {
    const [img, setImg] = useState<string | undefined>();
    const { takePhoto } = usePhotoGallery();
    const history = useHistory();
    const [, setUser] = useContext(UserContext);

    const logout = async () => {
        clearToken();
        history.push('/');
        setUser({
            loggedIn: false
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>הגדרות</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">הגדרות</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardContent>
                        <IonButton expand="block" onClick={logout}>התנתק</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default SettingsPage;
