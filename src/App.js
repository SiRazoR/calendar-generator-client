import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Home from './components/Home'
import Finish from './components/Finish'
import LecturesSelection from './components/LecturesSelection'

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
    },
    stepper: {
        marginTop: 0,
        marginBottom: 0,
        padding: 15
    },
    backButton: {
        marginRight: 10,
    },
    instructions: {
        marginTop: 10,
        marginBottom: 10,
    }
};

const Line = () => (
    <hr style={{color: '#f5f5f5'}}/>
);
const steps = ['Select group', 'Select lectures', 'Finish'];

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        };
    }

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
    };

    handleReset = () => {
        this.setState({activeStep: 0});
    };

    render() {
        return (
            <div style={styles.root}>
                <Paper style={styles.card}>

                    <Stepper
                        activeStep={this.state.activeStep}
                        style={styles.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Line/>
                    {this.state.activeStep === 0 && <Home/>}
                    {this.state.activeStep === 1 && <LecturesSelection/>}
                    {this.state.activeStep === 2 && <Finish/>}
                    <Line/>

                    <div>
                        {this.state.activeStep === steps.length - 1 ? (
                            <div>
                                <Typography style={styles.instructions}>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                    All steps completed
                                </Typography>

                            </div>
                        ) : (
                            <div>
                                <div>
                                    <Button
                                        disabled={this.state.activeStep === 0}
                                        onClick={this.handleBack}
                                        style={styles.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                </Paper>
            </div>
        );
    }
}