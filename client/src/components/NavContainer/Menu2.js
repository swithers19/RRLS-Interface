import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MetisMenu from 'react-metismenu';

const content=[
    {
        icon: 'icon-class-name',
        label: 'Label of Item',
        to: '#a-link',
    },
    {
        icon: 'icon-class-name',
        label: 'Second Item',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Sub Menu of Second Item',
                to: '#another-link',
            },
        ],
    },
];

class Menu2 extends Component {

    render(){
        return(
            <MetisMenu content={content} />
        )
    }
}

export default Menu2;
