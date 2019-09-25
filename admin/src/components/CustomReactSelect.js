import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {colourOptions} from "../pages/docs/data";
import Select from "react-select";

const styles = {
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
};

const CustomReactSelect = ({record = {}, source, classes}) =>
    <a href={record[source]}>
        {record[source]}
        <Select
            defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    </a>;

export default withStyles(styles)(CustomReactSelect);
