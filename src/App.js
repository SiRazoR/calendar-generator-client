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
                    <div>
                        <Line/>
                        <Footer getActiveStep={this.state.activeStep} steps={this.state.steps}
                                setActiveStep={this.setActiveStep} getSelectedGroups={this.state.selectedGroups}
                                isStepTwoCompleted={this.state.isStepTwoCompleted}
                        />
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
        top: '0', bottom: '0', left: '0', right: '0', position: 'absolute',
    },
    content: {
        height: '80%'
    },
    card: {
        marginTop: 50,
        marginBottom: 100,
        padding: 5,
        width: 1200,
        maxWidth: 1200,
    }
};