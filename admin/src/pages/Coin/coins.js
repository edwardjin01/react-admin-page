import React from 'react';
import {List, Create, Edit, Datagrid, SimpleForm, TextInput, DateTimeInput, TextField, DateField} from 'react-admin';

export const CoinList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="coingeckoTokenId"/>
            <TextField source="name"/>
            <TextField source="sticker"/>
        </Datagrid>
    </List>
);

export const CoinCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="coingeckoTokenId"/>
            <TextInput source="name"/>
            <TextInput source="sticker"/>
        </SimpleForm>
    </Create>
);

export const CoinEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="coingeckoTokenId"/>
            <TextInput source="name"/>
            <TextInput source="sticker"/>
        </SimpleForm>
    </Edit>
);
