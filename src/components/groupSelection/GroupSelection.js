import React from 'react';
import GroupInput from "./GroupInput";
import GroupSwitch from "./GroupSwitch";

export default class GroupSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedGroup: "",
            setGroupId:"",
            willModify: false
        };
    }

    setGroup = (groupId, groupName) => {
        this.state.selectedGroup = groupId;
        this.state.groupName = groupName;
        this.updateParentData();
    };

    setWillModify = (value) => {
        this.state.willModify = value;
        this.updateParentData();
    };

    updateParentData = () => {
        this.props.handleGroup({
            identifier: this.props.identifier,
            selectedGroup: this.state.selectedGroup,
            groupName: this.state.groupName,
            willModify: this.state.willModify
        })
    };

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.input}>
                    <GroupInput setGroupId={this.setGroup}/>
                </div>
                <div>
                    <GroupSwitch setWillModify={this.setWillModify}/>
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