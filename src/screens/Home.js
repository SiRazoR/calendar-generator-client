import React from 'react';
import Fab from '@material-ui/core/Fab';
import logo from '../resources/logo.png';
import GroupSelection from "../components/groupSelection/GroupSelection";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfGroups: 1,
            groupSelectionSections: [<GroupSelection handleGroup={this.handleGroupChange} identifier={0}/>],
            selectedGroups: [
                {
                    identifier: "",
                    selectedGroup: "",
                    willModify: false
                }
            ]
        };
    }

    handleGroupChange = (group) => {
        let found = false;
        this.state.selectedGroups.forEach(element => {
            if (element.identifier === "" || element.identifier === group.identifier) {
                console.log("Group already added, append data.");
                found = true;
                element.identifier = group.identifier;
                element.selectedGroup = group.selectedGroup;
                element.willModify = group.willModify;
            }
        });
        if (!found) {
            console.log("Group not found on the list, add new one.");
            this.state.selectedGroups.push(group)
        }
        console.log("Current groups: " + JSON.stringify(this.state.selectedGroups));
        this.props.setSelectedGroups(this.state.selectedGroups);
    };

    addOneMoreGroupSection = () => {
        console.log("Create switch for group " + this.state.numberOfGroups);
        this.setState({
            groupSelectionSections: [...this.state.groupSelectionSections,
                <GroupSelection handleGroup={this.handleGroupChange} identifier={this.state.numberOfGroups}/>]
        });
        this.setState({numberOfGroups: ++this.state.numberOfGroups});
    };

    render() {
        return (
            <div>
                <div style={styles.logo}>
                    <img src={logo} alt="Logo"/>
                </div>
                <div style={styles.content}>
                    {this.state.groupSelectionSections}
                </div>
                <div style={styles.button}>
                    <div>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="Add"
                            disabled={this.state.numberOfGroups === 3}
                            onClick={this.addOneMoreGroupSection}
                        >
                            Add one more group
                        </Fab>
                    </div>
                </div>
            </div>
        );
    }
}
const styles = {
    logo: {
        justifyContent: 'center',
        verticalAlign: 'center',
        display: 'flex',
    },
    content: {},
    button: {
        display: 'grid',
        gridTemplateColumns: "1fr",
        justifyItems: "end",
        marginRight: 20
    },
    extendedIcon: {
        marginRight: 10,
    },
};