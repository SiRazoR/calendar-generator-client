import React from 'react';

export default class Finish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <p> finish  + {this.props.getGeneratedLink}</p>
        );
    }
}