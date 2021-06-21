import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';

const AdoptPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>אמץ חיה</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">חיפוש</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
            פה יהיה לב או איקס
        </IonPage>
    );
};

export default AdoptPage;
