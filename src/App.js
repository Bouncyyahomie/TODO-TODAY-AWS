import { Amplify, DataStore } from 'aws-amplify';
import { Task } from './models';

import { Authenticator, Card } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <ListTask></ListTask>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

function ListTask() {
  const [ data, setData ] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const tasks = await DataStore.query(Task)
      setData(tasks)
    }

    loadData()

  })
  return (
    <>
      { data.map((t) => 
      <Card>
        {JSON.stringify(t)}
      </Card>) }
    </>
  )
}