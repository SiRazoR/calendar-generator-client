import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default class GroupSwitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    handleSwitchChange = async () => {
        await this.setState({checked: !this.state.checked});
        this.props.setWillModify(this.state.checked)
    };

    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Will you modify schedule?</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={this.state.checked} onChange={this.handleSwitchChange}
                                         value="gilad"/>}
                        label={this.state.checked ? "Yes, please" : "No, thanks"}
                    />
                </FormGroup>
                {this.state.checked && <FormHelperText>You will have to fill another form</FormHelperText>}
            </FormControl>
        );
    }
}
