import React from 'react';
import GroupInput from "./GroupInput";
import GroupSwitch from "./GroupSwitch";

export default class GroupSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    gotSelected = (value) => {
        console.log("got" + value)
    };

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.input}>
                    <GroupInput selected={this.gotSelected} addGroup={this.props.addGroup} removeGroup={this.props.removeGroup}/>
                </div>
                <div>
                    <GroupSwitch />
                </div>
            </div>

        );
    }
}

const styles = {
    root: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "10px",
        marginTop: 30,
        justifyContent: "center"
    },
    input: {
        justifySelf: 'end',
    }
};