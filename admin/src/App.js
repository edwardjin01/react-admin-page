import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { CoinList } from './coins';

const dataProvider = jsonServerProvider('http://localhost:8080');

const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* <Resource name="users" list={ListGuesser}/> */}
    <Resource name="coins" list={CoinList} edit={EditGuesser} />
  </Admin>
);

export default App;
