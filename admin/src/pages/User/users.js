// in src/users.js
import React from 'react';
import { List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField, EmailField, required, regex} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="phone"/>
            <TextField source="invitationCode"/>
            {/*<DateField source="created_at" showTime />*/}
        </Datagrid>
    </List>
);

export const UserCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="phone" validate={regex(/^0(\d{9})$/, 'Must be valid phone number')} />
        <TextInput source="invitationCode" validate={required()} />
      </SimpleForm>
    </Create>
  );
  
  export const UserEdit = props => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name"  validate={required()}/>
        <TextInput source="phone" validate={regex(/^0(\d{9})$/, 'Must be valid phone number')} />        
        <TextInput source="invitationCode" validate={required()} />
      </SimpleForm>
    </Edit>
  )
