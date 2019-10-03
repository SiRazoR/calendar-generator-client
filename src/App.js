import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@material-ui/core/Paper";
import Home from './screens/Home'
import Finish from './screens/Finish'
import LecturesSelection from './screens/LecturesSelection'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'
import axios from "axios";

const Line = () => (
    <hr style={{color: '#f5f5f5'}}/>
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: ['Select group', 'Select lectures', 'Finish'],
            selectedGroups: [
                {
                    identifier: "",
                    selectedGroup: "",
                    groupName:"",
                    willModify: false
                }
            ],
            isStepTwoCompleted: false,
            generatedLink: ""
        };

        console.log("Waking up API that provides calendar data.");
        axios.get('https://uek-calendar-generator.herokuapp.com/')
    }

    setActiveStep = (value) => {
        this.setState({activeStep: value});
        if(value === 0) {
            this.setSelectedGroups([{
                identifier: "",
                selectedGroup: "",
                groupName:"",
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

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.card}>
                    <div style={styles.main}>
                        <Header activeStep={this.state.activeStep} steps={this.state.steps}/>
                        <div style={styles.content}>
                            <Line/>
                            {this.state.activeStep === 0 && <Home setSelectedGroups={this.setSelectedGroups}/>}
                            {this.state.activeStep === 1 && <LecturesSelection getSelectedGroups={this.state.selectedGroups}
                                                                               setStepTwoCompleted={this.setStepTwoCompleted}
                                                                               setGeneratedLink={this.setGeneratedLink}
                                                                               setActiveStep={this.setActiveStep}
                                                                               getActiveStep={this.state.activeStep}/>}
                            {this.state.activeStep === 2 && <Finish getGeneratedLink={this.state.generatedLink}/>}
                        </div>
                        <div style={styles.footer}>
                            <Line/>
                            <Footer getActiveStep={this.state.activeStep} steps={this.state.steps}
                                    setActiveStep={this.setActiveStep} getSelectedGroups={this.state.selectedGroups}
                                    isStepTwoCompleted={this.state.isStepTwoCompleted}
                            />
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'center',
        backgroundColor: "#f5f5f5",
        minWidth: '400px',
        height: "100vh",
    },
    content: {
        height: '80%'
    },
    footer: {
        position: "absolute",
        width: "100%",
        bottom:10,
        left:0
    },
    main: {
    },
    card: {
        position:"relative",
        marginTop: 50,
        marginBottom: 100,
        padding: 5,
        width: 1200,
        maxWidth: 1200,
        height: '80%'
    }
};