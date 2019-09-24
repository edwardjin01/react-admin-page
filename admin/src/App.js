import React from 'react';
import {Admin, fetchUtils, ListGuesser, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {authProvider} from './auth';
import {CoinCreate, CoinEdit, CoinList} from './pages/Coin/coins';
import {UserCreate, UserEdit, UserList} from "./pages/User/users";
import {VideoCreate} from './pages/Video/videos';
import {ReportCreate} from './pages/Report/reports';
import addUploadCapabilities from './addUploadCapabilities'
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
let dataProvider = jsonServerProvider('http://localhost:8080', httpClient);
dataProvider = addUploadCapabilities(dataProvider);

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
