import {
    IonCard, IonIcon, IonLabel, IonChip, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonThumbnail,
    IonCardHeader, IonImg, IonCardSubtitle, IonCardTitle, IonCardContent, IonContent, useIonModal
} from '@ionic/react';
import { format } from 'date-fns'; import { useEffect, useState } from 'react';
import http from '../utils/http';
import { Pet } from '../context/pets';
import { tagsData } from '../utils/tags';

import './PetModal.css';

type PetModalProps = {
    petId: string;
    onDismiss?: () => void;
}

const PetModal = ({ petId, onDismiss }: PetModalProps) => {
    const [pet, setPet] = useState<Pet>();

    useEffect(() => {
        if (!petId) return;
        (async () => {
            const result = await http(`/api/pets/${petId}`, { method: 'GET' });
            setPet(result);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [petId, setPet]);

    return (
        <div>
            {pet && (
                <>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle size="large">{pet.name}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={onDismiss}>סגור</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonCard class="PetModal__container">
                        <IonImg src={pet.profilePhoto} />
                        <IonCardHeader>
                            <IonCardSubtitle>{format(new Date(pet.updatedAt), 'dd/MM/yy')}</IonCardSubtitle>
                            <IonCardTitle>{pet.name}</IonCardTitle>
                            {pet?.addedBy?.name && (
                              <IonCardSubtitle>נוסף על ידי {pet?.addedBy?.name}</IonCardSubtitle>
                            )}
                        </IonCardHeader>
                        <IonCardContent>
                            {pet.description}
                        </IonCardContent>
                        <IonCardContent>
                            {pet.tags.map((tagName) => {
                                const tag = tagsData[tagName];

                                return (
                                    <IonChip key={tag.text} outline>
                                        <IonIcon icon={tag.icon} color={tag.color} />
                                        <IonLabel>{tag.text}</IonLabel>
                                    </IonChip>
                                );
                            })}
                        </IonCardContent>
                        <IonCardContent class="PetModal__images-grid">
                            {['https://images.dog.ceo/breeds/schnauzer-giant/n02097130_5882.jpg',
                                'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_2631.jpg',
                                'https://images.dog.ceo/breeds/cockapoo/Scout.jpg',
                                'https://images.dog.ceo/breeds/bulldog-boston/n02096585_11614.jpg',
                                'https://images.dog.ceo/breeds/chow/n02112137_3570.jpg',
                                'https://images.dog.ceo/breeds/terrier-irish/n02093991_3968.jpg'].map((photo) => (
                                    <IonThumbnail key={photo}>
                                        <img src={photo} alt={pet.name} />
                                    </IonThumbnail>
                                ))}
                        </IonCardContent>
                    </IonCard>
                </>
            )}
        </div>
    );
};

export const usePetModal = () => {
    const [selectedPet, setSelectedPet] = useState<string>();
    const [presentPetModal, dismissPetModal] = useIonModal(PetModal, {
        petId: selectedPet,
        onDismiss: () => dismissPetModal()
    });

    const openPetModal = (petId: string) => {
        setSelectedPet(petId);
        presentPetModal({ swipeToClose: true });
    };

    return { openPetModal };
};

export default PetModal;
