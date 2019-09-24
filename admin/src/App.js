import React from 'react';
import {fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { authProvider } from './auth';
import {CoinList, CoinEdit, CoinCreate} from './pages/Coin/coins';
import {UserList, UserEdit, UserCreate} from "./pages/User/users";
import { VideoCreate } from './pages/Video/videos';
import { ReportCreate } from './pages/Report/reports';
import './App.css';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // add your own headers here
  options.headers.set('X-Custom-Header', 'foobar');
  options.headers.set('enctype', 'multipart/form-data');
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = jsonServerProvider('http://localhost:8080', httpClient);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {
      permissions => [
        <Resource name="coins" list={CoinList} edit={permissions === 'Administration' ? CoinEdit : null} create={CoinCreate} />,
        <Resource name='users' list={UserList} edit={permissions === 'Administration' ? UserEdit : null} create={UserCreate} />,
        <Resource name='videos' list={ListGuesser} create={VideoCreate} />,
        <Resource name='reports' list={ListGuesser} create={ReportCreate} />
      ]
    }
  </Admin>
);

export default App;
