import { IonContent, IonHeader, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTitle, IonToolbar, IonIcon, IonChip, IonImg, IonLabel, IonItem, IonButton } from '@ionic/react';
import { heartCircleOutline, chevronForward, chevronBack } from 'ionicons/icons';
import { useState } from 'react';
import { usePets } from '../context/pets';
import { tags, tagsData } from '../utils/tags';

import './AdoptPage.css';

const AdoptPage: React.FC = () => {
    const iconStyle = { fontSize: '8rem' };
    const [{ pets, lastUpdate }] = usePets();
    const [index, setIndex] = useState(0);
    const currentPet = pets[index];

    console.log({ pets, lastUpdate });

    const previousPet = () => {
        setIndex(index - 1);
    }

    const nextPet = () => {
        setIndex(index + 1);
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard class="full-page flex flex-column">
                    <IonCardHeader>
                        <IonCardTitle>{currentPet?.name || 'לא נמצאו חיות'}</IonCardTitle>
                    </IonCardHeader>
                    {currentPet ? (
                        <>

                            <IonCardContent>
                                <img className="AdoptPage__animal-image" src={currentPet.profilePhoto}></img>
                            </IonCardContent>

                            <IonCardContent>
                                {currentPet.description}
                                {' '}
                                <a target="_blank">קרא/י עוד</a>
                            </IonCardContent>

                            <IonCardContent>
                                {currentPet.tags.map((tagName) => {
                                    const tag = tagsData[tagName];

                                    return (
                                        <IonChip key={tag.text} outline>
                                            <IonIcon icon={tag.icon} color={tag.color} />
                                            <IonLabel>{tag.text}</IonLabel>
                                        </IonChip>
                                    );
                                })}
                            </IonCardContent>

                            <IonCardContent class="bottom-stick flex justify-center">
                                <IonIcon icon={chevronForward} style={iconStyle} color="medium" onClick={previousPet} />
                                <IonIcon onClick={() => alert('adopted')} icon={heartCircleOutline} style={iconStyle} color="danger" />
                                <IonIcon icon={chevronBack} style={iconStyle} color="medium" onClick={nextPet} />
                            </IonCardContent></>
                    ) : <></>}
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AdoptPage;
