import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonSearchbar, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { Pet } from '../context/pets';
import http from '../utils/http';
import { usePetModal } from './PetModal';

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [pets, setPets] = useState<Pet[]>([]);
    const timeoutRef = useRef<number | undefined>();
    const [loading, setLoading] = useState(false);
    const { openPetModal } = usePetModal();
    
    useEffect(() => {
        clearTimeout(timeoutRef.current);
        setLoading(true);

        timeoutRef.current = setTimeout(async () => {
            const results = await http(`/api/pets/search?q=${searchText}`, { method: 'GET' });
            setPets(results);
            setLoading(false);
        }, 600) as any;
    }, [searchText]);

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">חיפוש</IonTitle>
                    </IonToolbar>
                    <IonToolbar>
                        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="חפש חיה"></IonSearchbar>
                    </IonToolbar>
                </IonHeader>
                {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
                <IonList>
                    {pets?.length ? pets.map((pet) => (
                        <IonItem key={pet.id} button onClick={() => openPetModal(pet.id)}>
                            <IonAvatar slot="start">
                                <IonThumbnail>
                                    <img src={pet.profilePhoto} />
                                </IonThumbnail>
                            </IonAvatar>
                            <IonLabel>{pet.name}</IonLabel>
                        </IonItem>
                    )) : !loading && <IonItem><IonLabel>לא נמצאו תוצאות</IonLabel></IonItem>}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default SearchPage;
