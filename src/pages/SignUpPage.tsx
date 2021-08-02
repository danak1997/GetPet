import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonButton,
  IonCol, IonIcon, IonItem, IonLabel, IonInput, IonGrid, useIonLoading, useIonRouter
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useState, useContext } from 'react';
import './Tab1.css';
import UserContext from '../context/user';
import http from '../utils/http';
import { saveToken } from '../utils/auth';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setUser] = useContext(UserContext);
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const canPressRegister = name && email && password;

  const handleLogin = () => {
      if (!name || !email || !password) return;
      present('נרשם...');
      
      (async () => {
          try {
              await http('/api/user/signup', {
                  method: 'POST',
                  body: JSON.stringify({
                      name,
                      email,
                      password
                  })
              });
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
              router.push('/');
          } catch {
          } finally {
              setTimeout(() => {
                  dismiss();
              }, 500);
          }
      })()
  };

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>הרשמה</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen className="ion-text-center">
              <IonHeader collapse="condense">
                  <IonToolbar>
                      <IonTitle size="large">הרשמה</IonTitle>
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
                              <IonLabel position="floating">שם</IonLabel>
                              <IonInput
                                  type="text"
                                  value={name}
                                  onIonChange={(e) => setName(e.detail.value!)}
                              >
                              </IonInput>
                          </IonItem>
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
                              בלחיצה על הרשם הינך מאשר כי קראת את  <a href="#">תקנון השימוש</a>
                          </p>
                          <IonButton expand="block" onClick={handleLogin} disabled={!canPressRegister}>הרשם</IonButton>
                          <p style={{ fontSize: "medium" }}>
                              משתמש קיים? <Link to="/login">התחבר כאן!</Link>
                          </p>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};

export default SignUpPage;
