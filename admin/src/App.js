import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {CoinList, CoinEdit, CoinCreate} from './pages/Coin/coins';
import {UserList} from "./pages/User/users";
import './App.css';

const dataProvider = jsonServerProvider('http://localhost:8080');

const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* <Resource name="users" list={ListGuesser}/> */}
    <Resource name="coins" list={CoinList} edit={CoinEdit} create={CoinCreate} />
      <Resource name='users' list={UserList}/>
  </Admin>
);

export default App;
