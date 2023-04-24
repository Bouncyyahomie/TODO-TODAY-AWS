import { Amplify, DataStore } from 'aws-amplify';
import { Todos } from './models';

import { Authenticator, Card, TextField, Button, Text, Heading, View, Flex, Loader, TextAreaField} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Flex justifyContent="space-between">
            <Heading level={1}>Hello {user.attributes.emai}</Heading>
            <Button onClick={signOut}>Sign out</Button>
          </Flex>
          <ListTodos author={user.username}/>
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
  }, [])

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
      <Flex
        direction="row"
        gap="1rem"
        wrap="wrap"
        borderRadius="0.5rem"
        marginTop="4rem"
        marginBottom="6rem">
        {data.length > 0 
          ?
            <>
              {data.map((t) => 
              <Card
                padding="2rem"
                borderRadius="6px"
                boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                backgroundColor="#f8fafc"
                key={t.id}>
                <Heading level={4} marginBottom="1rem">{t.title}</Heading>
                <Text marginBottom="2rem">{t.description}</Text>
                <Flex marginTop="auto">
                  <Button variation="primary" onClick={() => toggleTodo(t.id)}>{t.done ? 'Done' : 'Undone'}
                  </Button>
                  <Button variation="warning" onClick={() => deleteTodo(t.id)}>Delete</Button>
                </Flex>
              </Card>) 
            }
            </>
          : <Text>Create todo now!!!</Text>
        }
      </Flex>
      <View
        as="div"
        padding="3rem"
        borderRadius="0.5rem"
        maxWidth="720px"
        marginLeft="auto"
        marginRight="auto"
        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        backgroundColor="#f1f5f9">
        <Heading marginBottom="2rem" level={3}>Create Todo</Heading>
        <TextField marginBottom="1rem" label="Title" value={titleInputValue} onChange={(e) => setTitleInputValue(e.target.value)} />
        <TextAreaField label="Description" value={descriptionInputValue} onChange={(e) => setDescriptionInputValue(e.target.value)} />
        <Button
          marginTop="2rem"
          marginLeft="auto"
          variation="primary"
          onClick={addTodo}>
          Add Todo
        </Button>
      </View>
    </>
  )
}
