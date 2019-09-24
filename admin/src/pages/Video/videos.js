import React from 'react';
import {
    Create,
    Datagrid,
    DateField,
    DateTimeInput,
    Edit,
    EmailField,
    List,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import Select from 'react-select';
import {colourOptions} from '../docs/data';

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
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="phone" />
          <Select
              defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={colourOptions}
              className="basic-multi-select"
              classNamePrefix="select"
          />
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
  );
