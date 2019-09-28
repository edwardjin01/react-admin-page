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
    TextInput,
    LongTextInput,
    NumberInput,
    RichTextField
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import CustomReactSelect from "../../components/CustomReactSelect";

export const VideoList = props => {
  // let { description } = props;
  // description = description && description.length > 20 ? `${description.slice(0, 100)}...` : description;
  // props = {...props, description};
  return (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="title"/>
            <ImageField source="thumbnailUri"/>
            <TextField 
              source="description" 
              component="p" 
              style={{width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} />
            <RichTextField source="embededCode"/>
            <TextField source="likedCount"/>
            <TextField source="unlikedCount"/>
            <TextField source="sharedCount"/>
            <DateField source="postTime"/>
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
        </Datagrid>
    </List>
)
};

export const VideoCreate = props => (
    <Create {...props}>
      <SimpleForm>
          <LongTextInput source="title"/>
          <ImageInput source="thumnail" label="Thumbnail Image" accept="image/*">
              <ImageField source="thumbnailUri" title="thumbnailUri"/>
          </ImageInput>
          <LongTextInput source="description"/>
          <CustomReactSelect source="tag"/>
          <RichTextInput source="embededCode"/>
          <NumberInput source="likedCount"/>
          <NumberInput source="unlikedCount"/>
          <NumberInput source="sharedCount"/>
          <DateTimeInput source="postTime"/>
      </SimpleForm>
    </Create>
  );
  
  export const VideoEdit = props => (
    <Edit {...props}>
      <SimpleForm>
          <LongTextInput source="title"/>
          <ImageField source="thumbnailUri" title="thumbnailUri"/>
          <LongTextInput source="description"/>
          {/* <CustomReactSelect source="tag"/> */}
          <RichTextInput source="embededCode"/>
          <NumberInput source="likedCount"/>
          <NumberInput source="unlikedCount"/>
          <NumberInput source="sharedCount"/>
          <DateTimeInput source="postTime"/>
          <DateField source="createdAt" showTime/>
          <DateField source="updatedAt" showTime/>
      </SimpleForm>
    </Edit>
  );
