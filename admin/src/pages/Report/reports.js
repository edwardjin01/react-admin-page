import React from 'react';
import { List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField, LongTextInput, FileInput, FileField, ImageInput, ImageField } from 'react-admin';

export const ReportList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="name"/>
      <TextField source="description"/>
      <ImageField source="thumbnail_image"/>
      <FileField source="path" title="path" />
      <DateField source="created_at" showTime />
    </Datagrid>
  </List>
);

export const ReportCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <ImageInput source="thumbnail_image" label="Thumbnail Image" accept="image/*">
        <ImageField source="thumbnail_image" title="title" />
      </ImageInput>
      <FileInput source="path" label="Attachment Files" accept="application/pdf">
        <FileField source="path" title="title" />
      </FileInput>
      <DateTimeInput source="created_at"  defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);
  
export const ReportEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <ImageField source="thumbnail_image" title="thumbnail_image" />      
      <FileField source="path" title="path" />
      <DateTimeInput source="created_at"  defaultValue={new Date()} />
    </SimpleForm>
  </Edit>
);