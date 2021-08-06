import { IonContent, IonPage, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonChip, IonLabel, IonCardSubtitle } from '@ionic/react';
import { heartCircleOutline, chevronForward, chevronBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { usePets } from '../context/pets';
import { tagsData } from '../utils/tags';
import { usePetModal } from './PetModal';

import './AdoptPage.css';
import useAdoptPet from '../hooks/useAdoptPet';

const AdoptPage: React.FC = () => {
    const iconStyle = { fontSize: '8rem' };
    const [{ pets, lastUpdate }] = usePets();
    const [index, setIndex] = useState(0);
    const pet = pets[index];
    const { openPetModal } = usePetModal();
    const { adoptPet } = useAdoptPet();
    const canGoToPrevious = index > 0 && pets.length;
    const canGoToNext = index < pets.length - 1;

    const previousButtonColor = canGoToPrevious ? 'medium' : 'light';
    const nextButtonColor = canGoToNext ? 'medium' : 'light';

    console.log({ pets, lastUpdate });

    const previousPet = () => {
        canGoToPrevious && setIndex(index - 1);
    }

    const nextPet = () => {
        canGoToNext && setIndex(index + 1);
    }

    useEffect(() => {
        if (!pets[index] && index > 0) {
            setIndex(index - 1)
        }
    }, [pets, index]);

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard class="full-page flex flex-column">
                    <IonCardHeader>
                        <IonCardTitle>{pet?.name || 'לא נמצאו חיות'}</IonCardTitle>
                        {pet && (<IonCardSubtitle>נוסף על ידי {pet?.addedBy?.name}</IonCardSubtitle>)}
                    </IonCardHeader>
                    {pet ? (
                        <>

                            <IonCardContent>
                                <img className="AdoptPage__animal-image" alt={pet.name} src={pet.profilePhoto}></img>
                            </IonCardContent>

                            <IonCardContent>
                                <IonLabel class="AdoptPage__description">{pet.description}</IonLabel>
                                <IonButton onClick={() => openPetModal(pet.id)} fill="clear" size="small">קרא/י עוד</IonButton>
                            </IonCardContent>

                            <IonCardContent style={{ padding: '0 10px' }}>
                                <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
                                    {pet.tags.map((tagName) => {
                                        const tag = tagsData[tagName];

                                        return (
                                            <IonChip key={tagName} outline>
                                                <IonIcon icon={tag.icon} color={tag.color} />
                                                <IonLabel>{tag.text}</IonLabel>
                                            </IonChip>
                                        );
                                    })}
                                </div>
                            </IonCardContent>

                            <IonCardContent class="bottom-stick flex justify-center" style={{ padding: 0 }}>
                                <IonIcon icon={chevronForward} style={iconStyle} color={previousButtonColor} onClick={previousPet} />
                                <IonIcon onClick={() => adoptPet(pet)} icon={heartCircleOutline} style={iconStyle} color="danger" />
                                <IonIcon icon={chevronBack} style={iconStyle} color={nextButtonColor} onClick={nextPet} />
                            </IonCardContent>
                        </>
                    ) : <></>}
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AdoptPage;
