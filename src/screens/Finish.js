import React from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import {Link} from 'react-router-dom'

export default class Finish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    paperComponent = (props) => {
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    };

    render() {
        return (
            <React.Fragment>
                <Paper>
                    <TextField
                        id="outlined-full-width"
                        label="Generated link"
                        style={{margin: 8}}
                        value={this.props.getGeneratedLink}
                        variant="outlined"
                    />
                    <CopyToClipboard text={this.props.getGeneratedLink}>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            copy to clipboard
                        </Button>
                    </CopyToClipboard>

                        <Button variant="outlined" color="primary" href={'https://calendar.google.com/calendar/r/settings/addbyurl'}>
                            open google calendar
                        </Button>


                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        PaperComponent={this.paperComponent}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                            Data successfully copied
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Now you can import calendar with generated URL. Click button to redirect directly to settings.
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Paper>
            </React.Fragment>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: 10,
        marginRight: 10
    },
    dense: {
        marginTop: 10
    },
    menu: {
        width: 200
    }
};
