import React from 'react';
import {
    Create,
    Datagrid,
    DateField,
    DateTimeInput,
    Edit,
    ImageField,
    ImageInput,
    List,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import CustomReactSelect from "../../components/CustomReactSelect";

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
          <TextInput source="title"/>
          <TextInput source="description"/>
          <ImageInput source="thumbnail_image" label="Thumbnail Image" accept="image/*">
              <ImageField source="thumbnail_image" title="title"/>
          </ImageInput>
          <CustomReactSelect source="tag"/>
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
          <CustomReactSelect source="tag"/>
        <DateTimeInput source="created_at" defaultValue={new Date()} />
      </SimpleForm>
    </Edit>
  );
