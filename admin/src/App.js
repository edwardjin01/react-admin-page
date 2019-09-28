import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from './provider';
import {authProvider} from './auth';
import {CoinCreate, CoinEdit, CoinList} from './pages/Coin/coins';
import {UserCreate, UserEdit, UserList} from "./pages/User/users";
import {VideoCreate, VideoEdit, VideoList} from './pages/Video/videos';
import {ReportCreate, ReportEdit, ReportList} from './pages/Report/reports';
import './App.css';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import {HttpError} from 'ra-core';

const httpClient = (url, options = {}) => {
  return fetch(url, options)
    .then(response => 
      response.text().then(text => ({
        status: response.status,
        statusText: response.status,
        headers: response.headers,
        body: text
      }))
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
  
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(
          new HttpError(
            (json && json.message) || statusText,
            status,
            json
          )
        )
      }
      return Promise.resolve({ status, headers, body, json});
    });
}
// let dataProvider = jsonServerProvider('http://138.197.63.39:8080', httpClient);
// let dataProvider = jsonServerProvider('http://35.187.243.39:8080', httpClient);
let dataProvider = jsonServerProvider('http://localhost:8080', httpClient);

const App = () => (
    // eslint-disable-next-line no-undef
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {
      permissions => [
          <Resource name="coins" list={CoinList} edit={CoinEdit}
                    create={CoinCreate} icon={AttachMoneyIcon}/>,
          <Resource name='videos' list={VideoList} edit={VideoEdit} create={VideoCreate} icon={VideoLibraryIcon}/>,
          <Resource name='users' list={UserList} edit={permissions === 'Administration' ? UserEdit : null}
                    create={UserCreate} icon={UserIcon}/>,
      ]
    }
  </Admin>
);

export default App;
