import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,Transition
  } from '@mantine/core';
  import { useState,useEffect } from 'react';
  export function AuthenticationTitle() {
    const [mounted,setMounted] = useState(false)
    useEffect(()=>(setMounted(true)),[])
    return (
      <Transition
          mounted={mounted}
          transition="pop"
          duration={200}
          timingFunction="ease"
        >
          {(styles) =>
      <Container style={{minWidth:"500px",...styles}} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ color:"#fff",fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
      }
      </Transition>
    );
  }