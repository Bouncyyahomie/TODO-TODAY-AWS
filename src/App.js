import { Amplify, DataStore } from 'aws-amplify';
import { Todos } from './models';

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
          <ListTodos author={user.username}/>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

function ListTodos(author) {
  const [ data, setData ] = useState([])
  useEffect(() => {
    const loadData = async () => {
      const todos = await DataStore.query(Todos, (todo) => todo.author.eq(author.author))
      setData(todos)
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

function CreateTodo(title, description, author) {
  useEffect(() => {
    const createData = async () => {
      await DataStore.save(
        new Todos({
          title: title,
          description: description,
          author: author.author
        })
      )
    }

    createData()

  })
}