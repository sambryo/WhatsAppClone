import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import ChatRoomScreen from './components/ChatRoomScreen';
import ChatsList from './components/ChatsListScreen';
import AnimatedSwitch from './components/AnimatedSwitch';
import './App.css';
import ChatsListScreen from './components/ChatsListScreen';
import { Animated } from 'react-native';

const App: React.FC = () => (
  <BrowserRouter>
    <AnimatedSwitch>
      <Route exact path="/chats/" component={ChatsListScreen} />
      <Route
        exact
        path="/chats/:chatId"
        component={({ match, history }: RouteComponentProps<{ chatId: string }>) => (
          <ChatRoomScreen chatId={match.params.chatId} history={history} />
        )} />
    </AnimatedSwitch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
);

const redirectToChats = () => <Redirect to="/chats" />

export default App;
