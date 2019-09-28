import React from 'react';
import {
  Create,
  Datagrid,
  DateField,
  DateTimeInput,
  Edit,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  List,
  LongTextInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import CustomReactSelect from "../../components/CustomReactSelect";

export const ReportList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="name"/>
      <TextField source="description"/>
      <ImageField source="thumbnail_image"/>
      <FileField source="path" title="path" />
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateField source="created_at" showTime />
    </Datagrid>
  </List>
);

export const ReportCreate = props => (
  <Create {...props} redirect="list" undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <ImageInput source="thumbnail_image" label="Thumbnail Image" accept="image/*">
        <ImageField source="thumbnail_image" title="title" />
      </ImageInput>
      <FileInput source="path" label="Attachment Files" accept="application/pdf">
        <FileField source="path" title="title" />
      </FileInput>
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateTimeInput source="created_at"  defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);
  
export const ReportEdit = props => (
  <Edit {...props} redirect="list" undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <ImageField source="thumbnail_image" title="thumbnail_image" />      
      <FileField source="path" title="path" />
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateTimeInput source="created_at"  defaultValue={new Date()} />
    </SimpleForm>
  </Edit>
);
