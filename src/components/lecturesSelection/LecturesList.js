import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

function extractLectureList(group) {
    let lectures = [];
    group.lecture.forEach( element => {
        lectures.push(element.dayOfTheWeek + ", " + element.name);
    });
    return lectures
}

export default function LecturesList(props) {
    return TransferList(extractLectureList(props.getGroup), props)
}

function updateLecturesMandatoryParam(props,ignoredLectures) {
    resetMandatory(props.getGroup.lecture);
    let days = [];
    let names = [];
    ignoredLectures.forEach( element => {
        let splitData = element.split(", ");
        days.push(splitData[0]);
        names.push(splitData[1]);
    });

    names.forEach( (name, index) => {
        props.getGroup.lecture.forEach( lecture => {
            if(lecture.name == name && lecture.dayOfTheWeek == days[index]){
                console.log("ignore " + lecture.name + " on day " + lecture.dayOfTheWeek);
                lecture.mandatory = false
            }
        })
    })
}

function resetMandatory(lectures){
    console.log("reset mandatory")
    lectures.forEach( lecture => {
        lecture.mandatory = true
    })
}

function TransferList(lectures, props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(lectures);
    const [right, setRight] = React.useState([]);
    const [disabled,setDisabled] = React.useState(false)

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = items => intersection(checked, items).length;

    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        updateLecturesMandatoryParam(props,right.concat(leftChecked))
    };

    const handleCheckedLeft = () => {

        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        updateLecturesMandatoryParam(props,not(right, rightChecked))
    };


    const testMethod = () => {
        console.log("Disable modification and send data to parent");
        setDisabled(true);
        props.setDone();
    };


    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                disabled={disabled}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0 || disabled}
                        inputProps={{ 'aria-label': 'all lectures selected' }}
                    />
                }
                title={title}
                subheader={`${items.length} lectures`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map(value => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" disabled={disabled} button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (

        <React.Fragment>
            {props.getGroup.groupId}
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList('Generate calendar with', left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button variant="contained" color="primary"
                            disabled={disabled}
                            onClick={testMethod}>
                        Done
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('Ignore', right)}</Grid>
        </Grid>
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 350,
        height: 235,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));