import { Amplify, DataStore } from 'aws-amplify';
import { Todos } from './models';

import { Authenticator, Card, TextField, Button, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <ListTodos author={user.username}/>
          <Button onClick={signOut}>Sign out</Button>
        </main>
      )}
    </Authenticator>
  );
}

function ListTodos(author) {
  const [ data, setData ] = useState([])
  const [ titleInputValue, setTitleInputValue ] = useState('')
  const [ descriptionInputValue, setDescriptionInputValue ] = useState('')

  useEffect(() => {
    const loadData = async () => {
      const todos = await DataStore.query(Todos, (todo) => todo.author.eq(author.author))
      setData(todos)
    }

    loadData()

  })

  const addTodo = async () => {
    if (titleInputValue.trim() === '') return
    if (descriptionInputValue.trim() === '') return
    const newTodo = await DataStore.save(new Todos({
      title: titleInputValue,
      description: descriptionInputValue,
      author: author.author,
      done: false
    }))
    setData([...data, newTodo])
    setTitleInputValue('')
    setDescriptionInputValue('')
  }

  const toggleTodo = async (id) => {
    const todo = await DataStore.query(Todos, id)
    await DataStore.save(Todos.copyOf(todo, updated => {
      updated.done = !updated.done
    }))
    loadData()
  }

  const loadData = async () => {
    const todos = await DataStore.query(Todos, (todo) => todo.author.eq(author.author))
    setData(todos)
  }

  const deleteTodo = async (id) => {
    await DataStore.delete(Todos, id)
    loadData()
  }
  
  return (
    <>
      { data.map((t) => 
        <Card key={t.id}>
          <Text>{t.title}</Text>
          <Text>{t.description}</Text>
          <Button onClick={() => toggleTodo(t.id)}>{t.done ? 'Done' : 'Undone'}</Button>
          <Button onClick={() => deleteTodo(t.id)}>Delete</Button>
        </Card>) 
      }
      <Text>Title</Text>
      <TextField value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)} />
      <Text>Description</Text>
      <TextField value={descriptionInputValue} onChange={(e) => setDescriptionInputValue(e.target.value)} />
      <Button onClick={addTodo}>Add Todo</Button>
    </>
  )
}
