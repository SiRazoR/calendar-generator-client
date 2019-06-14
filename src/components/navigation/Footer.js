import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class Footer extends React.Component {

    shouldButtonBeGrayed = (groupList) => {
        let shouldDisable = false;
        if (this.props.getActiveStep === 0) {
            groupList.forEach(element => {
                if (element.selectedGroup === "") {
                    shouldDisable = true;
                }
            });
        }
        if (this.props.getActiveStep === 1) {
            console.log("should disable" + !this.props.isStepTwoCompleted);
            shouldDisable = !this.props.isStepTwoCompleted
        }

        return shouldDisable
    };

    render() {
        const activeStep = this.props.getActiveStep;
        const steps = this.props.steps;

        return (
            <div style={styles.root}>
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
                                    disabled={this.shouldButtonBeGrayed(this.props.getSelectedGroups)}
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
    root: {
        bottom: '0'
    },
    backButton: {
        marginRight: 10,
    },
    instructions: {
        marginTop: 10,
        marginBottom: 10,
    }
};