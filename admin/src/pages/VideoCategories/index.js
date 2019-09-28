import React from 'react';

import {
  List, Datagrid, TextField, DateField
} from 'react-admin';

export const VideoCategoriesList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
        <TextField source="id"/>
        <TextField source="name"/>
        <DateField source="createdAt" showTime />
        <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
)