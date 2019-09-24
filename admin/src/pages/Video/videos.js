import React from 'react';
import { List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField, ImageInput, ImageField } from 'react-admin';

export const VideoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="title"/>
            <TextField source="description"/>
            <TextField source="thumbnail_image"/>
            <DateField source="created_at" showTime />
        </Datagrid>
    </List>
);

export const VideoCreate = props => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="description" />
        <ImageInput source="pictures" label="Thumbnail Image" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <DateTimeInput source="created_at"  defaultValue={new Date()} />
      </SimpleForm>
    </Create>
  );
  
  export const VideoEdit = props => (
    <Edit {...props}>
      <SimpleForm>
      <TextInput source="title" />
        <TextInput source="description" />
        <ImageInput source="pictures" label="Thumbnail Image" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <DateTimeInput source="created_at" defaultValue={new Date()} />
      </SimpleForm>
    </Edit>
  )