import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@material-ui/core/Paper";
import Home from './screens/Home'
import Finish from './screens/Finish'
import LecturesSelection from './screens/LecturesSelection'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'

const Line = () => (
    <hr style={{color: '#f5f5f5'}}/>
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: ['Select group', 'Select lectures', 'Finish'],
            numberOfGroups: 1
        };
    }

    setActiveStep = (value) => {
        this.setState({activeStep: value});
    };

    setNumberOfGroups = (value) => {
        this.setState({numberOfGroups:value})
    };

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.card}>
                    <Header activeStep={this.state.activeStep} steps={this.state.steps}/>
                    <div style={styles.content}>
                        <Line/>
                        {this.state.activeStep === 0 && <Home setNumberOfGroups={this.setNumberOfGroups}/>}
                        {this.state.activeStep === 1 && <LecturesSelection getNumberofGroups={this.state.numberOfGroups}/>}
                        {this.state.activeStep === 2 && <Finish/>}
                    </div>
                    <div>
                        <Line/>
                        <Footer activeStep={this.state.activeStep} steps={this.state.steps}
                                setActiveStep={this.setActiveStep}/>
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