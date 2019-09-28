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
    UrlField,
    LongTextInput,
    NumberInput,
    ReferenceArrayInput,
    SelectArrayInput,
    ReferenceManyField,
    SingleFieldList,
    ChipField,
    required
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const VideoList = props => {
  // let { description } = props;
  // description = description && description.length > 20 ? `${description.slice(0, 100)}...` : description;
  // props = {...props, description};
  return (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="title"/>
            <UrlField source="thumbnailUri" target="newtab" />
            <TextField 
              source="description" 
              component="p" 
              style={{width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} />
            <TextField source="embededCode"/>
            <TextField source="likedCount"/>
            <TextField source="unlikedCount"/>
            <TextField source="sharedCount"/>
            <DateField source="postTime"/>
            {/* <ReferenceManyField label="Token" reference="coins" target="id">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            <ReferenceManyField label="Categories" reference="videoCategories" target="id">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField> */}
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
        </Datagrid>
    </List>
)
};

export const VideoCreate = props => (
    <Create {...props}>
      <SimpleForm redirect="list">
          <LongTextInput source="title" validate={required()}/>
          <ImageInput source="thumbnail" label="Thumbnail Image" accept="image/*">
              <ImageField source="src" title="thumbnailUri"/>
          </ImageInput>
          <LongTextInput source="description" multiline rows={5} validate={required()}/>
          {/* <CustomReactSelect source="tag"/> */}
          <RichTextInput source="embededCode" multiline rows={5} validate={required()}/>
          <NumberInput source="likedCount" defaultValue={0} validate={required()}/>
          <NumberInput source="unlikedCount" defaultValue={0} validate={required()}/>
          <NumberInput source="sharedCount" defaultValue={0} validate={required()}/>
          <ReferenceArrayInput source="tokens" reference="coins">
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="videoCategories" reference="videoCategories">
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
          <DateTimeInput source="postTime" defaultValue={new Date()} validate={required()}/>
      </SimpleForm>
    </Create>
  );
  
  export const VideoEdit = props => (
    <Edit {...props} undoable={false}>
      <SimpleForm redirect="list">
          <LongTextInput source="title" validate={required()}/>
          <UrlField source="thumbnailUri" title="thumbnailUri"/>
          <LongTextInput source="description"/>
          {/* <CustomReactSelect source="tag"/> */}
          <RichTextInput source="embededCode" validate={required()}/>
          <NumberInput source="likedCount" validate={required()}/>
          <NumberInput source="unlikedCount" validate={required()}/>
          <NumberInput source="sharedCount" validate={required()}/>
          <ReferenceArrayInput label="Tokens" defaultValue={[]} source="tokens" reference="coins">
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
          <ReferenceArrayInput label="Categories" defaultValue={[]} source="videoCategories" reference="videoCategories">
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
          <DateTimeInput source="postTime" validate={required()}/>
          <DateField source="createdAt" showTime/>
          <DateField source="updatedAt" showTime/>
      </SimpleForm>
    </Edit>
  );
