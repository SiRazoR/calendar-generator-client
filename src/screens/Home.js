import React from 'react';
import Fab from '@material-ui/core/Fab';
import logo from '../resources/logo.png';
import GroupSelection from "../components/groupSelection/GroupSelection";
import Button from "@material-ui/core/Button";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberOfGroups: 1,
            groupSelectionSections: [<GroupSelection/>]
        };
}

    addOneMoreGroupSection = () => {
        this.setState({numberOfGroups: ++this.state.numberOfGroups});
        this.props.setNumberOfGroups(this.state.numberOfGroups);
        this.setState( { groupSelectionSections: [...this.state.groupSelectionSections,<GroupSelection/>]});
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
                            variant="extendeded"
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