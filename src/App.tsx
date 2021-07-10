import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading,
  useIonRouter,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { search, home, paw, settings, camera } from 'ionicons/icons';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserContext, { User } from './context/user';
import { useEffect, useState } from 'react';
import SearchPage from './pages/SearchPage';
import CameraPage from './pages/CameraPage';
import AdoptPage from './pages/AdoptPage';
import { clearToken, hasToken } from './utils/auth';
import http from './utils/http';
import SettingsPage from './pages/SettingsPage';
import PetsContext, { PetsState } from './context/pets';

const tabs = [
  {
    id: 'home',
    href: '/home',
    icon: home,
    label: 'ראשי'
  },
  {
    id: 'adopt',
    href: '/adopt',
    icon: paw,
    label: 'אמץ'
  },
  {
    id: 'camera',
    href: '/camera',
    icon: camera,
    label: 'צלם'
  },
  {
    id: 'search',
    href: '/search',
    icon: search,
    label: 'חפש'
  },
  {
    id: 'settings',
    href: '/settings',
    icon: settings,
    label: 'הגדרות'
  },
]

const App: React.FC = () => {
  const [user, setUser] = useState<User>({
    loggedIn: hasToken()
  });
  const [petsState, setPetsState] = useState<PetsState>({ pets: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (user.loggedIn && !user.name) {
        try {
          setLoading(true);
          const userData = await http('/api/user', { method: 'GET' });
          setUser({
            ...user,
            ...userData
          });
          setLoading(false);
        } catch {
          setLoading(false);
          clearToken();
          setUser({ loggedIn: false });
        }
      }
    })();
  }, [user, user.loggedIn]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <PetsContext.Provider value={[petsState, setPetsState]}>
        <IonApp dir="rtl">
          <IonLoading isOpen={loading} message="טוען מידע" />
          <IonReactRouter>
            {user.loggedIn ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/home">
                    <HomePage />
                  </Route>
                  <Route exact path="/adopt">
                    <AdoptPage />
                  </Route>
                  <Route exact path="/search">
                    <SearchPage />
                  </Route>
                  <Route exact path="/camera">
                    <CameraPage />
                  </Route>
                  <Route exact path="/settings">
                    <SettingsPage />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  {tabs.map((tab) => (
                    <IonTabButton tab={tab.id} href={tab.href} key={tab.id}>
                      <IonIcon icon={tab.icon} />
                      <IonLabel>{tab.label}</IonLabel>
                    </IonTabButton>
                  ))}
                </IonTabBar>
              </IonTabs>
            ) : (
              <Route path="*">
                <LoginPage />
              </Route>
            )}
          </IonReactRouter>
        </IonApp>
      </PetsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
