import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const CoinList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="symbol" />
      <DateField source="created_on" />
    </Datagrid>
  </List>
);