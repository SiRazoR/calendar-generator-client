import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@material-ui/core/Paper";
import Home from './screens/Home'
import Finish from './screens/Finish'
import LecturesSelection from './screens/LecturesSelection'
import Header from './components/Header'
import Footer from './components/Footer'

const Line = () => (
    <hr style={{color: '#f5f5f5'}}/>
);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: ['Select group', 'Select lectures', 'Finish']
        };
    }

    setActiveStep = (value) => {
        this.setState({activeStep: value});
    };

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.card}>
                    <Header activeStep={this.state.activeStep} steps={this.state.steps}/>
                    <Line/>
                    {this.state.activeStep === 0 && <Home/>}
                    {this.state.activeStep === 1 && <LecturesSelection/>}
                    {this.state.activeStep === 2 && <Finish/>}
                    <Line/>
                    <Footer activeStep={this.state.activeStep} steps={this.state.steps}
                            setActiveStep={this.setActiveStep}/>
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
        marginTop: 50
    },
    card: {
        padding: 5,
        width: 1200,
        maxWidth: 1200,
    }
};