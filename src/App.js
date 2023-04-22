import { Amplify, DataStore } from 'aws-amplify';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Task } from './models';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      <IonPage>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </IonPage>
    </Authenticator>
  );
}

function ListTask() {
  useEffect(() => {
    const loadData = async () => {
      const posts = await DataStore.query()
    }
  })
  return (
    <></>
  )
}