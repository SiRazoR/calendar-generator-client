import React from 'react';
import Fab from '@material-ui/core/Fab';
import logo from '../resources/logo.png';
import GroupSelection from "../components/groupSelection/GroupSelection";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfGroups: 1,
            groupSelectionSections: [<GroupSelection addGroup={this.addGroup} removeGroup={this.removeGroup}/>],
            selectedGroups: []
        };
}
    addGroup = (group) => {
        if(this.state.selectedGroups.includes(group)){
            console.log("This group is already added.")
        } else {
            console.log("Adding group " + group + " to the list.")
            this.state.selectedGroups = [...this.state.selectedGroups,group];
            this.props.setSelectedGroupsInput(this.state.selectedGroups);

        }
    };

    removeGroup = (group) => {
        if(this.state.selectedGroups.includes(group)){
            console.log("Form was edited, removing " + group + " from group list.")
            let newArray = this.state.selectedGroups.filter(element => element !== group );
            this.state.selectedGroups = newArray;
            this.props.setSelectedGroupsInput(this.state.selectedGroups)
        }
    };

    addOneMoreGroupSection = () => {
        this.setState({numberOfGroups: ++this.state.numberOfGroups});
        this.setState( { groupSelectionSections: [...this.state.groupSelectionSections,<GroupSelection addGroup={this.addGroup} removeGroup={this.removeGroup}/>]});
        console.log(this.state.numberOfGroups)
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
                <div style = {styles.button}>
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
    content: {
    },
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