import { IonContent, IonHeader, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTitle, IonToolbar, IonIcon, IonChip, IonImg, IonLabel, IonItem } from '@ionic/react';
import { heartCircleOutline, chevronForward, chevronBack } from 'ionicons/icons';
import { tags, tagsData } from '../utils/tags';

import './AdoptPage.css';

const AdoptPage: React.FC = () => {
    const animalTags = [tags.trained, tags.kidFriendly];
    const iconStyle = { fontSize: '8rem' };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard class="full-page flex flex-column">
                    <IonCardHeader>
                        {/* <IonCardSubtitle>כלבים</IonCardSubtitle> */}
                        <IonCardTitle>חבר</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <img className="AdoptPage__animal-image" src="https://64.media.tumblr.com/3adafe52ae323e2eb6a5bc2f83d011eb/be61ad162182c199-88/s400x600/8557c0b06b956b3562b2df5f7930af00a81ef069.png"></img>
                    </IonCardContent>

                    <IonCardContent>
                        חבר הוא כלב נפלא שאולף על ידי ארתור הבחור ההוא עם הדבר הזה... קרא/י עוד
                    </IonCardContent>

                    <IonCardContent>
                        {animalTags.map((tagName) => {
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
                        <IonIcon icon={chevronForward} style={iconStyle} color="medium" />
                        <IonIcon onClick={() => alert('adopted')} icon={heartCircleOutline} style={iconStyle} color="danger" />
                        <IonIcon icon={chevronBack} style={iconStyle} color="medium" />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default AdoptPage;
