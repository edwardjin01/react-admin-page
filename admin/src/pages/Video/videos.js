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
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="phone" />
        <DateTimeInput source="created_at"  defaultValue={new Date()} />
      </SimpleForm>
    </Edit>
  );
