import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">חיפוש</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="חפש חיה"></IonSearchbar>
                <IonList>
                    <IonItem>
                        <IonLabel>סוג אחד של כלב</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>סוג אחר</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>עוד תוצאה</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>דוגו ווף ווף</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>פיקאצ'ו</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
