import React from 'react';
import Fab from '@material-ui/core/Fab';
import logo from '../resources/calendar.png';
import GroupSelection from "../components/groupSelection/GroupSelection";
import "../styles/Text.scss";

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
                    groupName: "",
                    willModify: false
                }
            ]
        };
    }

    handleGroupChange = (group) => {
        let found = false;
        this.state.selectedGroups.forEach(element => {
            if (element.identifier === "" || element.identifier === group.identifier) {
                found = true;
                element.identifier = group.identifier;
                element.selectedGroup = group.selectedGroup;
                element.groupName = group.groupName;
                element.willModify = group.willModify;
            }
        });
        if (!found) {
            console.log("Group not found on the list, add new one.");
            this.state.selectedGroups.push(group)
        }
        this.props.setSelectedGroups(this.state.selectedGroups);
    };

    addOneMoreGroupSection = () => {
        this.setState({
            groupSelectionSections: [...this.state.groupSelectionSections,
                <GroupSelection handleGroup={this.handleGroupChange} identifier={this.state.numberOfGroups}/>]
        });
        this.setState({numberOfGroups: ++this.state.numberOfGroups});
    };

    render() {
        return (
            <div style={styles.content}>
                <div style={styles.text}>
                    <h1>UEK Calendar Generator <img src={logo} alt="Logo" style={styles.logo}/></h1>
                    <h2>Do you want to connect your university schedule <br/>
                        with powerfull planning tool as google calendar ? <br/><br/>
                        Just simply search for your group. </h2>
                </div>
                <div style={styles.content}>
                    {this.state.groupSelectionSections}
                </div>
                <div className={"button"}>
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
    text: {
        textAlign: "center"
    },
    content: {
        paddingTop: "10px"
    },
    logo: {
        width: "100%",
        maxWidth: 120,
        height: "auto"
    },
    image: {
        justifyContent: 'center',
        verticalAlign: 'center',
        display: 'flex',
    },
    extendedIcon: {
        marginRight: 10,
    },
};