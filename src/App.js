import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './screens/Home'
import Finish from './screens/Finish'
import LecturesSelection from './screens/LecturesSelection'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'
import axios from "axios";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiIsRunning: false,
            dialogOpen: true,
            activeStep: 0,
            steps: ['Select group', 'Select lectures', 'Finish'],
            selectedGroups: [
                {
                    identifier: "",
                    selectedGroup: "",
                    groupName: "",
                    willModify: false
                }
            ],
            isStepTwoCompleted: false,
            generatedLink: ""
        };


    }

    componentDidMount() {
        console.log("Waking up API");
        axios.get('https://cors-anywhere.herokuapp.com/https://uek-calendar-generator.herokuapp.com/wake')
            .then(response => {
                if (response.status === 200) {
                    console.log("Got API response! We are ready to go!");
                    this.setState({apiIsRunning: true});
                }
            }).catch(
            function (error) {
                console.log(error)
            });
    }

    setActiveStep = (value) => {
        this.setState({activeStep: value});
        if (value === 0) {
            this.setSelectedGroups([{
                identifier: "",
                selectedGroup: "",
                groupName: "",
                willModify: false
            }]);
        }
    };

    setSelectedGroups = async (value) => {
        await this.setState({selectedGroups: value});
    };

    setStepTwoCompleted = (value) => {
        this.setState({isStepTwoCompleted: value});
    };

    setGeneratedLink = (value) => {
        console.log("URL generated: " + value);
        this.setState({generatedLink: value});
    };

    handleClose = () => {
        this.setState({open: false})
    };

    paperComponent = (props) => {
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    };

    render() {
        return (
            <div style={styles.root}>

                {this.state.apiIsRunning === false &&
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    PaperComponent={this.paperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{cursor: 'move', alignSelf: "center"}} id="draggable-dialog-title">
                        Schedule API is starting
                    </DialogTitle>
                    <DialogContent style={{textAlign: "center"}}>
                        <DialogContentText>
                            Please be patient, calendar API is deployed on free server so it needs to be waken up.
                            <br/><br/>
                            This window will disappear in a moment.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                }
                <div style={styles.card}>
                    <Header style={styles.header} activeStep={this.state.activeStep} steps={this.state.steps}/>
                    <div>
                        {this.state.activeStep === 0 && <Home setSelectedGroups={this.setSelectedGroups}/>}
                        {this.state.activeStep === 1 && <LecturesSelection getSelectedGroups={this.state.selectedGroups}
                                                                           setStepTwoCompleted={this.setStepTwoCompleted}
                                                                           setGeneratedLink={this.setGeneratedLink}
                                                                           setActiveStep={this.setActiveStep}
                                                                           getActiveStep={this.state.activeStep}/>}
                        {this.state.activeStep === 2 && <Finish getGeneratedLink={this.state.generatedLink}/>}
                    </div>
                    <div style={styles.footer}>
                        <Footer getActiveStep={this.state.activeStep} steps={this.state.steps}
                                setActiveStep={this.setActiveStep} getSelectedGroups={this.state.selectedGroups}
                                isStepTwoCompleted={this.state.isStepTwoCompleted}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'center',
        height: "100vh",
    },
    card: {
        position: "relative",
        marginLeft: "10px",
        padding: 5,
        width: "1300px",
    },
    header: {
        width: "100%",
    },
    footer: {
        marginTop: "50px"
    }
};