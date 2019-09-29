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
      <TextField source="title"/>
      <ImageField source="thumbnailUri"/>
      <FileField source="path" title="path" />
      <TextField source="description"/>
      <TextField source="reportUri"/>
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateField source="postTime" showTime />
    </Datagrid>
  </List>
);

export const ReportCreate = props => (
  <Create {...props} redirect="list" undoable={false}>
    <SimpleForm>
      <TextInput source="title" />
      <ImageInput source="thumbnailUri" label="thumbnailUri Image" accept="image/*">
        <ImageField source="thumbnailUri" title="title" />
      </ImageInput>
      <LongTextInput source="description" />
      <FileInput source="reportUri" label="reportUri" accept="application/*">
        <FileField source="reportUri" title="reportUri" />
      </FileInput>
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateTimeInput source="postTime"  defaultValue={new Date()} />
    </SimpleForm>
  </Create>
);
  
export const ReportEdit = props => (
  <Edit {...props} redirect="list" undoable={false}>
    <SimpleForm>
      <TextInput source="title" />
      <ImageField source="thumbnailUri" title="thumbnailUri Image" />
      <FileField source="thumbnailUri" title="path" />
      <LongTextInput source="description" />
      <FileInput source="reportUri" label="reportUri" accept="application/*">
        <FileField source="reportUri" title="reportUri" />
      </FileInput>
      <CustomReactSelect source="tag" title="Tag coin"/>
      <DateTimeInput source="postTime"  defaultValue={new Date()} />
    </SimpleForm>
  </Edit>
);
