import React from 'react';
import {List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField} from 'react-admin';

export const CoinList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="coingeckoTokenId"/>
            <TextField source="name"/>
            <TextField source="sticker"/>
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
        </Datagrid>
    </List>
);

export const CoinCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="coingeckoTokenId"/>
            <TextInput source="name"/>
            <TextInput source="sticker"/>
        </SimpleForm>
    </Create>
);

export const CoinEdit = props => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextInput source="coingeckoTokenId"/>
            <TextInput source="name"/>
            <TextInput source="sticker"/>
            <DateField source="createdAt" showTime />
            <DateField source="updatedAt" showTime />
        </SimpleForm>
    </Edit>
);
