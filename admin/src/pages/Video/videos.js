import React from 'react';
import { List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField, EmailField } from 'react-admin';

export const VideoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <EmailField source="email"/>
            <TextField source="name"/>
            <TextField source="phone"/>
            <DateField source="created_at" showTime />
        </Datagrid>
    </List>
);

export const VideoCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="phone" />
        <DateTimeInput source="created_at"  defaultValue={new Date()} />
      </SimpleForm>
    </Create>
  );
  
  export const VideoEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="phone" />
        <DateTimeInput source="created_at"  defaultValue={new Date()} />
      </SimpleForm>
    </Edit>
  )