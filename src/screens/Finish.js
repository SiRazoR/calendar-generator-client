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
import logo from "../resources/calendar.png";
import "../styles/Text.scss";
import DialogActions from '@material-ui/core/DialogActions';

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
            <Paper style={styles.paper}>
                <div style={styles.text}>
                    <h1>UEK Calendar Generator <img src={logo} alt="Logo" style={styles.logo}/></h1>
                </div>
                <div style={styles.content}>
                    <h2>Here is your generated calendar URL. <br/> Copy and paste it into your google calendar.</h2>
                    <TextField
                        id="outlined"
                        style={{margin: 8}}
                        value={this.props.getGeneratedLink}
                        variant="outlined"
                    />
                    <CopyToClipboard text={this.props.getGeneratedLink}>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            copy to clipboard
                        </Button>
                    </CopyToClipboard>

                    <Button variant="outlined" color="primary"
                            href={'https://calendar.google.com/calendar/r/settings/addbyurl'}>
                        open google calendar
                    </Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    PaperComponent={this.paperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{cursor: 'move', alignSelf: "center"}} id="draggable-dialog-title">
                        Data successfully copied
                    </DialogTitle>
                    <DialogContent style={{textAlign: "center"}}>
                        <DialogContentText>
                            Now you are ready to paste copied URL into your google calendar.
                            <br/><br/>Click "Open Google calendar" button below to be redirected directly into the
                            settings.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

const styles = {
    text: {
        textAlign: "center"
    },
    paper: {
        textAlign: "-webkit-center",
        marginRight: "10px",
        paddingBottom: "30px"
    },
    logo: {
        width: "100%",
        maxWidth: 120,
        height: "auto"
    },
    content: {
        display: "grid",
        gridRowGap: "10px",
        maxWidth: "800px",
        padding: "40px",
        height: "40%"
    }
};