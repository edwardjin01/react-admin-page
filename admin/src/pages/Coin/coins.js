import React from 'react';
import { List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField } from 'react-admin';

export const CoinList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="symbol" />
      <DateField source="created_on" showTime />
    </Datagrid>
  </List>
);

export const CoinCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="symbol" />
      <DateTimeInput source="created_on"  defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);

export const CoinEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="symbol" />
      <DateTimeInput source="created_on" />
    </SimpleForm>
  </Edit>
)