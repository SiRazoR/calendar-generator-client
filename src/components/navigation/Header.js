import React from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const Line = () => (
    <hr style={{color: '#f5f5f5'}}/>
);

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Stepper
                    activeStep={this.props.activeStep}
                    style={styles.stepper}>
                    {this.props.steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Line/>
            </div>

        );
    }
}
const styles = {};