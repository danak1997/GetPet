import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonButton,
    IonCol, IonIcon, IonItem, IonLabel, IonInput, IonGrid, useIonLoading
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { personCircle } from 'ionicons/icons';
import { useState, useEffect, useContext } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import UserContext from '../context/user';
import http from '../utils/http';
import { saveToken } from '../utils/auth';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    const [present, dismiss] = useIonLoading();

    const handleLogin = () => {
        present('מתחבר');
        
        (async () => {
            try {
                const { token } = await http('/api/user/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                if (!token) throw new Error('Invalid Token');

                saveToken(token);
                setUser({
                    loggedIn: true
                });
                history.push('/');
            } catch {
            } finally {
                dismiss();
            }
        })()
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>התחברות</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-text-center">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">התחברות</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol className="flex-justify-center">
                            <IonIcon
                                style={{ fontSize: "70px" }}
                                icon={personCircle}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">אימייל</IonLabel>
                                <IonInput
                                    type="email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">סיסמא</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <p style={{ fontSize: "small" }}>
                                בלחיצה על התחבר הינך מאשר כי קראת את  <a href="#">תקנון השימוש</a>
                            </p>
                            <IonButton expand="block" onClick={handleLogin}>התחבר</IonButton>
                            <p style={{ fontSize: "medium" }}>
                                עדיין אין לך משתמש? <a href="#">הירשם כאן!</a>
                            </p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <ExploreContainer name="Tab 1 page" /> */}
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
