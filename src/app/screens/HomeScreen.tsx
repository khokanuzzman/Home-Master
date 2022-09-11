import React from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';

const HomeScreen = (props: any) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      The easiest way to start with your amazing application.
    </Paragraph>
    <Button mode="contained" onPress={() => props.navigation.navigate('login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => props.navigation.navigate('register')}
    >
      Sign Up
    </Button>
  </Background>
);

export default HomeScreen;
