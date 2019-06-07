import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class Footer extends React.Component {

    render() {
        const activeStep = this.props.activeStep;
        const steps = this.props.steps;

        return (
            <div>
                {activeStep === steps.length - 1 ? (
                    <div>
                        <Typography style={styles.instructions}>
                            <Button onClick={this.props.setActiveStep.bind(this, 0)}>Reset</Button>
                            All steps completed
                        </Typography>

                    </div>
                ) : (
                    <div>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.props.setActiveStep.bind(this, activeStep - 1)}
                                style={styles.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary"
                                    onClick={this.props.setActiveStep.bind(this, activeStep + 1)}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const styles = {
    backButton: {
        marginRight: 10,
    },
    instructions: {
        marginTop: 10,
        marginBottom: 10,
    }
};