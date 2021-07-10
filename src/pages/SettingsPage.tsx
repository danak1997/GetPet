import { IonButton, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, useIonRouter } from '@ionic/react';
import { useContext } from 'react';
import UserContext from '../context/user';
import { clearToken } from '../utils/auth';

const SettingsPage: React.FC = () => {
    const router = useIonRouter();
    const [, setUser] = useContext(UserContext);

    const logout = async () => {
        clearToken();
        router.push('/');
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
