import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './screens/Home'
import Finish from './screens/Finish'
import LecturesSelection from './screens/LecturesSelection'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'
import axios from "axios";


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
                    groupName: "",
                    willModify: false
                }
            ],
            isStepTwoCompleted: false,
            generatedLink: ""
        };

        console.log("Waking up API");
        axios.get('https://uek-calendar-generator.herokuapp.com/').catch(
            function (error) {
                console.log(error)
            })
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

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.card}>
                    <Header style={styles.header} activeStep={this.state.activeStep} steps={this.state.steps}/>
                    <div style={styles.content}>
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
        //marginTop: 10,
        //marginBottom: 10,
        padding: 5,
        width: "1300px",
        // maxWidth: 1200
    },
    header: {
        width: "100%",
    },
    content: {
       // height:"60%"
    },
    footer: {
        marginTop: "50px"
        // position: "absolute",
        // width: "100%",
        // bottom:10,
        // left:0
    }
};